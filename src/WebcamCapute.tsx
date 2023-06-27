import React, { useRef, useState } from 'react';

const WebcamCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const startWebcam = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (video && canvas && context) {
      // Set canvas dimensions to match video stream
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw current video frame onto the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas image to data URL
      const photoDataUrl = canvas.toDataURL('image/png');
      setPhotoUrl(photoDataUrl);
      console.log(photoUrl)
    }
  };

  return (
    <div>
      <button onClick={startWebcam}>Start Webcam</button>
      <br />
      <video ref={videoRef} width="400" height="300" />
      <br />
      <button onClick={takePhoto}>Take Photo</button>
      {photoUrl && <img src={photoUrl} alt="Captured" />}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default WebcamCapture;
