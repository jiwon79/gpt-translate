import React, { useEffect, useRef } from 'react';

interface Props {
  audioData: Uint8Array;
  height?: number;
}

const Wave: React.FC<Props> = ({ audioData, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = () => {
    if (canvasRef.current === null) return;
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth - 144;
    canvas.height = window.innerWidth > 599 ? 60 : 32;
    const { width, height } = canvas;
    let x = 0;
    const sliceWidth = width / audioData.length;

    const context = canvas.getContext('2d');
    if (context === null) return;
    context.lineWidth = 3;
    context.strokeStyle = '#aaaaaa';
    context.clearRect(0, 0, width, height);

    context.beginPath();
    context.moveTo(0, height / 2);

    for (const item of audioData) {
      // TODO: 마지막에 진폭 조정하기
      const y = (3 * item / 255.0 - 1) * height;
      context.lineTo(x, y);
      x += sliceWidth;
    }
    context.lineTo(x, height / 2);
    context.stroke();
  };

  useEffect(() => {
    draw();
  });

  return (
    <canvas width="940" height={height} ref={canvasRef} />
  );
};
export default Wave;
