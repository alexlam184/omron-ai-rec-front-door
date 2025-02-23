'use client';
import { useBodyTemperatureQuery } from '@/service/apiService';
import { useGeneralStateStore } from '@/store/GeneralStateStore';
import { useEffect, useRef, useState } from 'react';

interface DimensionsType {
  center_x: number;
  center_y: number;
  face_width: number;
  face_height: number;
}

interface CameraFeedProps {
  style?: React.CSSProperties;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ style }) => {
  const { data: BodyTemperature } = useBodyTemperatureQuery();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null); // Reference for the logo

  // const [fps, setFps] = useState<number>(0);
  // const [num, setNum] = useState<number>(0);
  // const [dimensions_show, setDimensions_show] = useState<DimensionsType | null>(
  //   null
  // );
  const { setGeneral_ModalIsOpenedState, setGeneral_ModalContentState } =
    useGeneralStateStore();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const isSendingRef = useRef<boolean>(true);
  const lastCallRef = useRef<number>(Date.now());

  // Load the logo
  useEffect(() => {
    const img = new Image();
    img.src = '/image/okao.png'; // Update with your actual logo path
    img.onload = () => {
      logoRef.current = img;
    };
  }, []);

  // Initialize Camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();
  }, []);

  // API Call Function
  const sendFrameToBackend = async () => {
    if (!videoRef.current || !isSendingRef.current) return;

    const now = Date.now();
    if (now - lastCallRef.current < 1000) return; // Throttle calls (1 second)

    lastCallRef.current = now;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const video = videoRef.current;

    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/png')
    );

    if (!blob) return;

    const formData = new FormData();
    formData.append('file', blob, 'frame.png');

    formData.append(
      'temperature',
      BodyTemperature?.ambient.toString() ?? '-9999'
    );

    try {
      const response = await fetch(backendUrl + '/api/v1/attendance/create', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      // setDimensions_show(data.dimensions);
      if (!data.dimensions || !data.attendanceDto.staffResponseDto) {
        console.log('No face detected');
        return;
      }

      console.log(
        `Staff ID:${data.attendanceDto.staffResponseDto.staffId}, ${data.attendanceDto.staffResponseDto.firstName} ${data.attendanceDto.staffResponseDto.lastName} face detected`
      );
      renderPredictions(data.dimensions);

      if (data.attendanceDto.staffResponseDto.staffId > 0) {
        setGeneral_ModalContentState(
          `Success`,
          `Welcome, Staff ID:${data.attendanceDto.staffResponseDto.staffId}, ${data.attendanceDto.staffResponseDto.firstName} ${data.attendanceDto.staffResponseDto.lastName}. Open the door now`
        );
        setGeneral_ModalIsOpenedState(true);
      } else {
        setGeneral_ModalContentState(
          `Fail`,
          `Face detected but you are not authorized to get in.`
        );
        setGeneral_ModalIsOpenedState(true);
      }
    } catch (error) {
      let message = 'Error sending frame to backend:' + error;
      console.error(message);
      setGeneral_ModalContentState(`Error`, message);
      setGeneral_ModalIsOpenedState(true);
    }
  };

  const renderPredictions = (dimensions: DimensionsType) => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bounding box for detected face
    if (dimensions) {
      const { center_x, center_y, face_width, face_height } = dimensions;
      console.log('Render dimensions:' + JSON.stringify(dimensions, null, 2));

      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 4;
      ctx.strokeRect(
        center_x - face_width / 2,
        center_y - face_height / 2,
        face_width,
        face_height
      );
    }

    // Draw watermark logo
    if (logoRef.current) {
      const logoSize = 80; // Adjust logo size as needed
      ctx.drawImage(
        logoRef.current,
        canvas.width - logoSize - 10,
        canvas.height - logoSize - 10,
        logoSize,
        logoSize
      );
    }
  };

  // Periodically Send Frames
  useEffect(() => {
    const interval = setInterval(() => {
      if (isSendingRef.current) sendFrameToBackend();
    }, 5000); // Send frame every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        ...style,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '10px',
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  );
};

export default CameraFeed;
