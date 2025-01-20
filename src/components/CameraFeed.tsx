'use client';
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fps, setFps] = useState<number>(0);
  const [num, setNum] = useState<number>(0);
  const [dimensions_show, setDimensions_show] = useState<DimensionsType | null>(
    null
  );
  // const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { setGeneral_ModalIsOpenedState, setGeneral_ModalContentState } =
    useGeneralStateStore();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const isSendingRef = useRef<boolean>(true);
  const lastCallRef = useRef<number>(Date.now());

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
    if (now - lastCallRef.current < 1000) return; // Throttle calls (5 seconds)

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

    // Create an image URL from the blob
    // const imageUrl = URL.createObjectURL(blob);
    // setImageUrl(imageUrl); // Update the state with the image URL

    const formData = new FormData();
    formData.append('file', blob, 'frame.png');
    formData.append('temperature', '37.7');

    try {
      const response = await fetch(backendUrl + '/api/v1/attendance/create', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      setDimensions_show(data.dimensions);
      if (!data.dimensions || !data.attendanceDto.staffResponseDto) {
        console.log('No face detected');
        return;
      }

      console.log(
        `Staff ID:${data.attendanceDto.staffResponseDto.staffId}, ${data.attendanceDto.staffResponseDto.firstName} ${data.attendanceDto.staffResponseDto.lastName} face detected`
      );
      renderPredictions(data.dimensions);

      if (data.attendanceDto.staffResponseDto.staffId > 0) {
        // alert(
        //   `Welcome, Staff ID:${data.attendanceDto.staffResponseDto.staffId}, ${data.attendanceDto.staffResponseDto.firstName} ${data.attendanceDto.staffResponseDto.lastName}. Open the door now`
        // );

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
      console.error('Error sending frame to backend:', error);
    }
  };

  const renderPredictions = (dimensions: DimensionsType) => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (dimensions) {
      const { center_x, center_y, face_width, face_height } = dimensions;
      console.log('render dimensions:' + JSON.stringify(dimensions, null, 2));

      const x = center_x - face_width / 2;
      const y = center_y - face_height / 2;

      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 4;
      ctx.strokeRect(300, 80, 20, 20);

      if (
        x < videoRef.current!.videoWidth * 0.5 &&
        y < videoRef.current!.videoHeight * 0.5
      ) {
        setNum((prev) => prev + 1);
      }
    }
  };

  // Button Handlers
  const stopSending = () => {
    isSendingRef.current = false;
    console.log('Stopped sending frames.');
    alert('Stopped sending frames.');
  };

  const resumeSending = () => {
    isSendingRef.current = true;
    console.log('Resumed sending frames.');
    alert('Resumed sending frames.');
  };

  // Periodically Send Frames
  useEffect(() => {
    const interval = setInterval(() => {
      if (isSendingRef.current) sendFrameToBackend();
    }, 5000); // Send frame every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={style}>
      <div>
        <div
          style={{ position: 'relative', width: '100%', overflow: 'hidden' }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{ width: '100%', height: '100%' }}
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
        <div>FPS: {fps}</div>
        <div>Face Detections: {num}</div>
        <div>Dimension: {JSON.stringify(dimensions_show, null, 2)}</div>
      </div>
      {/* {imageUrl && (
        <div>
          <h2>Captured Frame:</h2>
          <img
            src={imageUrl}
            alt="Captured frame"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )} */}

      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={stopSending}
          style={{ padding: '10px', background: '#f44336' }}
        >
          Stop Sending
        </button>
        <button
          onClick={resumeSending}
          style={{ padding: '10px', background: '#4caf50' }}
        >
          Resume Sending
        </button>
      </div>
    </div>
  );
};

export default CameraFeed;
