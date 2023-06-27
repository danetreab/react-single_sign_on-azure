import React, { useEffect, useRef } from 'react';
import jsQR from 'jsqr';

const QRScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let video: HTMLVideoElement | null = videoRef.current;
    let canvas: HTMLCanvasElement | null = canvasRef.current;
    let loadingMessage = document.getElementById("loadingMessage") as HTMLDivElement;
    let outputContainer = document.getElementById("output") as HTMLDivElement;
    let outputMessage = document.getElementById("outputMessage") as HTMLDivElement;
    let outputData = document.getElementById("outputData") as HTMLSpanElement;

    const drawBox = (begin: any, b: any, c: any, d: any, color: string) => {
      if (canvas) {
        const ctx = canvas.getContext("2d")!;
        ctx.beginPath();
        ctx.moveTo(begin.x, begin.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineTo(c.x, c.y);
        ctx.lineTo(d.x, d.y);
        ctx.lineTo(begin.x, begin.y);
        ctx.lineWidth = 4;
        ctx.strokeStyle = color;
        ctx.stroke();
      }
    };

    const tick = () => {
      if (video && canvas) {
        loadingMessage.innerText = "Loading video...";
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          loadingMessage.hidden = true;
          canvas.hidden = false;
          outputContainer.hidden = false;

          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data as Uint8ClampedArray, imageData.width, imageData.height);
          if (code) {
            drawBox(
              code.location.topLeftCorner,
              code.location.topRightCorner,
              code.location.bottomRightCorner,
              code.location.bottomLeftCorner,
              "#FF3B58"
            );
            outputMessage.hidden = true;
            outputData.parentElement?.removeAttribute("hidden");
            outputData.innerText = code.data;
          } else {
            outputMessage.hidden = false;
            outputData.parentElement?.setAttribute("hidden", "");
          }
        }
      }
      requestAnimationFrame(tick);
    };

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(function (stream) {
        if (video) {
          video.srcObject = stream;
          video.setAttribute("playsInline", "true");
          video.play();
          requestAnimationFrame(tick);
        }
      });

    return () => {
      (video?.srcObject as MediaStream)?.getTracks().forEach(track => track.stop());

    };
  }, []);

  return (
    <div>
      <div id="loadingMessage">Unable to access video stream (please make sure you have a webcam enabled)</div>
      <canvas ref={canvasRef} id="canvas" hidden></canvas>
      <div id="output" hidden>
        <div id="outputMessage">No QR code detected.</div>
        <div hidden><b>Data:</b> <span id="outputData"></span></div>
      </div>
      <video ref={videoRef} hidden></video>
    </div>
  );
};

export default QRScanner;
