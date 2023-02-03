import React, { useRef, useEffect } from "react";
import styled from "styled-components";
const StyledResultCanvas = styled.canvas`
  width: ${(props) => props.boxSize}px;
  height: ${(props) => props.boxSize}px;
`;
/**
 * 이미지 소스와 좌표를 넘겨주면 잘라서 보여준다.
 * @param {*} param0
 * @returns
 */

export default function ImageBox({
  imgSrc,
  leftTopX,
  rightBottomX,
  leftTopY,
  rightBottomY,
  boxSize,
}) {
  const resultCanvas = useRef(undefined); //잘라진 영역 확인
  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = function () {
      const result = resultCanvas.current;
      result.width = boxSize;
      result.height = boxSize;

      resultCanvas.current.getContext("2d").drawImage(
        img,
        leftTopX, //이미지 x좌표
        leftTopY, //이미지 y좌표
        rightBottomX - leftTopX, //자를 가로
        rightBottomY - leftTopY, //자를 세로
        0,
        0,
        boxSize,
        boxSize
      );
    };
  }, []);
  return (
    <StyledResultCanvas
      boxSize={boxSize}
      ref={resultCanvas}
    ></StyledResultCanvas>
  );
}
