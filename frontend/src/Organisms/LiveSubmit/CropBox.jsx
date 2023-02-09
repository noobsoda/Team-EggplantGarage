import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

import SmallBtn from "../../Atoms/Buttons/ExtraSmallBtn";
import SmallStrokeBtn from "../../Atoms/Buttons/ExtraSmallStrokeBtn";

const StyledResultCanvas = styled.canvas`
  width: 70px;
  height: 70px;
  border: 1.5px solid ${({ theme }) => theme.color.darkgrey};
  border-radius: 8px;
`;

const StyledCropBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const StyledButtomBox = styled.div`
  display: flex;
  align-items: flex-end;
  width: 136px;
  justify-content: space-between;
`;

export default function CropBox({
  imgSrc,
  startPos,
  endPos,
  goCrop,
  goCropRest,
  cancel,
  submit,
}) {
  const resultCanvas = useRef(undefined); //잘라진 영역 확인
  const [resultCtx, setResultCtx] = useState();
  useEffect(() => {
    resultCanvas.current.width = 72;
    resultCanvas.current.height = 72;
    setResultCtx(resultCanvas.current.getContext("2d"));
  }, []);
  useEffect(() => {
    if (endPos[0] - startPos[0] < 30 || endPos[1] - startPos[1] < 30) {
      return;
    }
    const img = new Image();
    img.src = imgSrc;
    img.onload = function () {
      CropImage(img);
    };
  }, [goCrop]);

  useEffect(() => {
    CropRest();
  }, [goCropRest]);

  /**
   * 이미지 자르기
   * @param {*} width
   * @param {*} height
   */
  function CropImage(img) {
    resultCtx.drawImage(
      img,
      startPos[0], //이미지 x좌표
      startPos[1], //이미지 y좌표
      endPos[0] - startPos[0], //자를 이미지 크기
      endPos[1] - startPos[1], //자를 이미지
      0,
      0,
      72,
      72
    );
  }

  /**
   * 크롭 이미지 리셋
   */
  function CropRest() {
    resultCanvas.current
      .getContext("2d")
      .clearRect(0, 0, resultCanvas.current.width, resultCanvas.current.height);
  }

  return (
    <StyledCropBox>
      <StyledResultCanvas ref={resultCanvas}></StyledResultCanvas>
      <StyledButtomBox>
        <SmallStrokeBtn name="제거" buttonClick={cancel}></SmallStrokeBtn>
        <SmallBtn name="등록" buttonClick={submit}></SmallBtn>
      </StyledButtomBox>
    </StyledCropBox>
  );
}
