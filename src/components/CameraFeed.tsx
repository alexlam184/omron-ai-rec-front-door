'use client';
import {
  useBodyTemperatureQuery,
  useSendFrameMutation,
} from '@/service/apiService';
import { useGeneralStateStore } from '@/store/GeneralStateStore';
import { useEffect, useRef, useCallback } from 'react';

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

  const { setGeneral_ModalIsOpenedState, setGeneral_ModalContentState } =
    useGeneralStateStore();

  const { mutate: sendFrameToBackend } = useSendFrameMutation({
    onSuccess: (data) => {
      console.log('Success:', data);
      if (!data.dimensions || !data.attendanceDto?.staffResponseDto) {
        console.log('No face detected');
        return;
      }

      console.log(
        `Staff ID: ${data.attendanceDto.staffResponseDto.staffId}, ${data.attendanceDto.staffResponseDto.firstName} ${data.attendanceDto.staffResponseDto.lastName} face detected`
      );
      //renderPredictions(data.dimensions); //rendering the face box

      const { staffId, firstName, lastName } =
        data.attendanceDto.staffResponseDto;
      if (staffId > 0) {
        setGeneral_ModalContentState(
          `Success`,
          `Welcome, Staff ID: ${staffId}, ${firstName} ${lastName}. Open the door now`
        );
      } else {
        setGeneral_ModalContentState(
          `Fail`,
          `Face detected but you are not authorized to get in.`
        );
      }
      setGeneral_ModalIsOpenedState(true);
    },
    onError: (error) => {
      console.error('Error sending frame:', error);
      setGeneral_ModalContentState('Error', `Error sending frame: ${error}`);
      setGeneral_ModalIsOpenedState(true);
    },
  });

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

  // Capture and Send Frame
  const captureImage = useCallback(async () => {
    console.log('sending image...');
    if (!videoRef.current) return;

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
      BodyTemperature?.object.toString() ?? '-9999'
    );

    const r = await sendFrameToBackend(formData);
  }, [BodyTemperature, sendFrameToBackend]);

  // Periodically Send Frames Every 5 seconds
  useEffect(() => {
    const interval = setInterval(captureImage, 3000);
    return () => clearInterval(interval);
  }, [captureImage]);

  // Render bounding box and watermark
  const renderPredictions = (dimensions: DimensionsType) => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bounding box
    const { center_x, center_y, face_width, face_height } = dimensions;
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 4;
    ctx.strokeRect(
      center_x - face_width / 2,
      center_y - face_height / 2,
      face_width,
      face_height
    );
  };

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
      <img
        src="/image/okao.png"
        className="absolute z-50 top-0 right-0 w-36 m-4"
      ></img>
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
