import React, { useRef, useEffect } from "react";
import { useState } from "react";

const MAX_CANVAS_WIDTH = 500;
const MAX_CANVAS_HEIGHT = 500;

export default function Canvas() {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [pos, setPos] = useState([0, 0]);
  const [isdrawing, setIsDrawing] = useState(false);

  const [imageSize, setImageSize] = useState([0, 0]); //width , height
  const [image, setImage] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current; //canvas를 useRef로 가져온다.
    canvas.width = MAX_CANVAS_WIDTH;
    canvas.height = MAX_CANVAS_HEIGHT;
    const context = canvas.getContext("2d");

    //이미지 지정
    const image = new Image();
    image.src = `https://mblogthumb-phinf.pstatic.net/MjAxNzEyMDZfMjQg/MDAxNTEyNTcyMDc0ODM3.lwG4ny1ayJ1NfwaWqJ_9ya5rzpGAKoD9xDc6U6itZccg.uptfXHqmdrZsmluIucGIhzrFrdKThMJ3SbAcGzqwWhMg.JPEG.hsnhit161222/SAM_1711.JPG?type=w800`;

    //이미지 크기 조정, 캔버스 크기에 맞게 조정해준다.
    const imageWidth =
      image.width > image.height
        ? MAX_CANVAS_WIDTH
        : (image.width * MAX_CANVAS_HEIGHT) / image.height;

    const imageHeight =
      image.width > image.height
        ? (image.height * MAX_CANVAS_WIDTH) / image.width
        : MAX_CANVAS_HEIGHT;
    image.onload = () => {
      context.drawImage(image, 0, 0, imageWidth, imageHeight);
    };
    setImageSize([imageWidth, imageHeight]);
    setImage(image);

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

  function drawSquareImage(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    if (!isdrawing) return;
    ctx.clearRect(
      0,
      0,
      canvasRef.current.canvas.clientWidth,
      canvasRef.current.canvas.clientHeight
    );
    ctx.drawImage(image, 0, 0, imageSize[0], imageSize[1]);
    ctx.strokeStyle = "red";
    ctx.strokeRect(pos[0], pos[1], offsetX - pos[0], offsetY - pos[1]);
  }
  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseUp={finishDrawing}
        onMouseDown={startDrawing}
        onMouseMove={drawSquareImage}
      ></canvas>
    </>
  );
}
