import React, { useRef, useEffect } from "react";
import { useState } from "react";

export default function Canvas() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [pos, setPos] = useState([0, 0]);
  const [isdrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current; //canvas를 useRef로 가져온다.
    canvas.width = 400;
    canvas.height = 600;
    const context = canvas.getContext("2d");

    context.strokeStyle = "red";
    context.lineWidth = 2.4;

    canvasRef.current = context;
    setCtx(canvasRef.current);
  }, []);

  function startDrawing(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    setIsDrawing(true);

    ctx.beginPath();

    setPos([offsetX, offsetY]);

    ctx.moveTo(offsetX, offsetY);
  }

  function finishDrawing(e) {
    setIsDrawing(false);
  }

  function drawSquare(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    if (!isdrawing) return;
    ctx.clearRect(
      0,
      0,
      canvasRef.current.canvas.clientWidth,
      canvasRef.current.canvas.clientHeight
    );
    ctx.strokeStyle = "red";
    ctx.strokeRect(pos[0], pos[1], offsetX - pos[0], offsetY - pos[1]);
  }
  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseUp={finishDrawing}
        onMouseDown={startDrawing}
        onMouseMove={drawSquare}
      ></canvas>
    </>
  );
}
