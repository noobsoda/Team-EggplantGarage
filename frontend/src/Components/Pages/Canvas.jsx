import React, { useRef, useEffect } from "react";
import { useState } from "react";

export default function Canvas() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [isdrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current; //canvas를 useRef로 가져온다.

    const context = canvas.getContext("2d");

    context.strokeStyle = "black";
    context.lineWidth = 2.4;

    canvasRef.current = context;
    setCtx(canvasRef.current);
  }, []);

  function startDrawing(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    setIsDrawing(true);

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  }

  function finishDrawing(e) {
    setIsDrawing(false);
  }

  function move(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isdrawing) {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      console.log(`${offsetX} ${offsetY}`);
    }
  }
  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseUp={finishDrawing}
        onMouseDown={startDrawing}
        onMouseMove={move}
      ></canvas>
    </>
  );
}
