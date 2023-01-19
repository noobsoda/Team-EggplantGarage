import React, { useRef, useEffect } from "react";
import { useState } from "react";

const MAX_CANVAS_WIDTH = 500;
const MAX_CANVAS_HEIGHT = 500;

const CROP_CANVAS_WIDTH = 100;
const CROP_CANVAS_HEIGHT = 100;

export default function Canvas() {
  const canvasRef = useRef(null);
  const cropResultRef = useRef(null); //크롭 결과

  const [ctx, setCtx] = useState(null);
  const [resultCtx, setResultCtx] = useState(null);

  const [pos, setPos] = useState([0, 0]); //클릭시 위치로 시작 위치가 된다.
  const [isdrawing, setIsDrawing] = useState(false); //현재 그리고 있는지 여부

  const [imageSize, setImageSize] = useState([0, 0]); //width , height
  const [image, setImage] = useState(null);

  const [ratio, setRatio] = useState(1.0); //이미지가 변형된 비율

  useEffect(() => {
    //이미지가 들어오는 canvas
    const canvas = canvasRef.current; //canvas를 useRef로 가져온다.
    canvas.width = MAX_CANVAS_WIDTH;
    canvas.height = MAX_CANVAS_HEIGHT;
    const context = canvas.getContext("2d");

    //결과 canvas설정
    const result = cropResultRef.current;
    result.width = CROP_CANVAS_WIDTH;
    result.height = CROP_CANVAS_HEIGHT;
    const resultContext = result.getContext("2d");

    //이미지 지정
    const image = new Image();
    image.src = `https://w.namu.la/s/59bbf73b123d0f9f693be3c3de9506b24a1f2a3067b4ffd0207a3a08eee32d750ebf1ca3e33084aa3bbcd6916bd0a8a187cc4556b87fa269c25f1a7ff3ea279f74f1a90137b47dc122e3f58d3c1f3e53a092103c1a7f6d00196287cdffed803fdd89efb263322d263d56e274c5b47cd0`;
    // image.src = `https://mblogthumb-phinf.pstatic.net/MjAxNzEyMDZfMjQg/MDAxNTEyNTcyMDc0ODM3.lwG4ny1ayJ1NfwaWqJ_9ya5rzpGAKoD9xDc6U6itZccg.uptfXHqmdrZsmluIucGIhzrFrdKThMJ3SbAcGzqwWhMg.JPEG.hsnhit161222/SAM_1711.JPG?type=w800`;

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

    //이미지 크기 재조정 되면 그에 맞는 비율 계산
    if (image.width > image.height && image.width > MAX_CANVAS_WIDTH) {
      let ratio = MAX_CANVAS_WIDTH / image.width;
      setRatio(ratio);
    }
    if (image.height > image.width && image.height > MAX_CANVAS_HEIGHT) {
      let ratio = MAX_CANVAS_HEIGHT / image.height;
      setRatio(ratio);
    }

    setImageSize([imageWidth, imageHeight]);
    setImage(image);

    canvasRef.current = context;
    setCtx(canvasRef.current);

    cropResultRef.current = resultContext;
    setResultCtx(cropResultRef.current);
  }, []);

  function startDrawing(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    setIsDrawing(true);

    ctx.beginPath();

    setPos([offsetX, offsetY]);

    ctx.moveTo(offsetX, offsetY);
  }

  function finishDrawing(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    CropImage(offsetX - pos[0], offsetY - pos[1]);
    setIsDrawing(false);
  }

  /**
   * 이미지 자르기
   */
  function CropImage(width, height) {
    console.log(ratio);
    console.log(`${pos[0] * ratio} ${pos[1] * ratio}`);
    console.log(`${width * ratio} ${height * ratio}`);
    resultCtx.drawImage(
      image,
      pos[0] / ratio, //이미지 x좌표
      pos[1] / ratio, //이미지 y좌표
      width / ratio, //자를 이미지 크기
      height / ratio, //자를 이미지
      0,
      0,
      CROP_CANVAS_WIDTH,
      CROP_CANVAS_HEIGHT
    );
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
      <canvas ref={cropResultRef}></canvas>
    </>
  );
}
