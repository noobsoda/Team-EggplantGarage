import React, { useRef, useState, useEffect } from "react";
import InputBox from "../../Molecules/InputBox";
import Checkbox from "../../Molecules/CheckBox";
import styled from "styled-components";
const StyledBox = styled.div`
  width: 360px;
`;

const StyledNoneCanvas = styled.canvas`
  display: None;
`;

const StyledCanvas = styled.canvas`
  width: 360px;
`;

export default function ProductSubmitBox({ imgSrc }) {
  const originCanvas = useRef(undefined); //원본 그림 저장
  const drawCanvas = useRef(undefined); //실제 그리는 영역
  const resultCanvas = useRef(undefined); //잘라진 영역 확인

  const [pos, setPos] = useState([0, 0]); //클릭시 위치로 시작 위치가 된다.
  const [isdrawing, setIsDrawing] = useState(false); //현재 그리고 있는지 여부

  const [ctx, setCtx] = useState(null); //실제 그리는 영역의 canvas

  const [img, setImg] = useState(undefined); //원본 이미지

  const [ratio, setRatio] = useState(0.0); //원본이미지와 canvas의 비율

  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = function () {
      //원본 캔버스
      originCanvas.current.width = img.width;
      originCanvas.current.height = img.height;
      originCanvas.current.getContext("2d").drawImage(img, 0, 0);

      //실제 그리는 캔버스
      drawCanvas.current.width = img.width;
      drawCanvas.current.height = img.height;
      drawCanvas.current.getContext("2d").drawImage(img, 0, 0);
      setImg(img);
    };

    //결과 캔버스
    const result = resultCanvas.current;
    result.width = 500;
    result.height = 500;

    //비율 계산

    setCtx(drawCanvas.current.getContext("2d"));
  }, [imgSrc]);

  /**
   * 마우스 그리기 시작
   *
   * @param {*} e
   */
  function startDrawing(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    setIsDrawing(true);

    ctx.beginPath();

    setPos([offsetX, offsetY]);

    ctx.moveTo(offsetX, offsetY);
  }
  /**
   * 마우스 그리기 종료
   * @param {*} e
   */
  function finishDrawing(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    CropImage(offsetX - pos[0], offsetY - pos[1]);
    setIsDrawing(false);
  }

  /**
   * 사각형 그리기
   * @param {*} e
   * @returns
   */
  function drawSquareImage(e) {
    const { offsetX, offsetY } = e.nativeEvent;
    if (!isdrawing) return;
    ctx.clearRect(0, 0, drawCanvas.current.width, drawCanvas.current.height);
    ctx.drawImage(img, 0, 0, img.width, img.height);
    ctx.strokeStyle = "red";
    ctx.strokeRect(pos[0], pos[1], offsetX - pos[0], offsetY - pos[1]);
  }

  /**
   * 이미지 자르기
   * @param {*} width
   * @param {*} height
   */
  function CropImage(width, height) {
    console.log(ratio);
    console.log(`${pos[0] * ratio} ${pos[1] * ratio}`);
    console.log(`${width * ratio} ${height * ratio}`);
    resultCanvas.current.getContext("2d").drawImage(
      img,
      pos[0] / ratio, //이미지 x좌표
      pos[1] / ratio, //이미지 y좌표
      width / ratio, //자를 이미지 크기
      height / ratio, //자를 이미지
      0,
      0,
      500,
      500
    );
  }

  return (
    <StyledBox>
      <div>
        <StyledNoneCanvas ref={originCanvas}></StyledNoneCanvas>
        <StyledCanvas
          ref={drawCanvas}
          onMouseUp={finishDrawing}
          onMouseDown={startDrawing}
          onMouseMove={drawSquareImage}
        ></StyledCanvas>
        <button>제거</button>
        <button>그리기</button>
        <canvas ref={resultCanvas}></canvas>
      </div>
      <InputBox placehold="제품명을 입력하세요" />
      <Checkbox id="price" text="즉시구매가" />
      <InputBox placehold="즉시구매가를 입력하세요" />
    </StyledBox>
  );
}
