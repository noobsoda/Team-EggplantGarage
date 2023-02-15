import React from "react";
import styled from "styled-components";
import Button from "../../Atoms/Buttons/ExtraSmallBtn";

const StyledBox = styled.div`
  height: 100%;
  width: 100%;
  /* flex: 1 1; */
  /* margin: 24px 40px; */
`;
const StyledGreenBox = styled.div`
  color: ${({ theme }) => theme.color.green};
  padding-bottom: 56px;
  font-size: 14px;
`;

const StyledHead = styled.h1`
  padding-bottom: 56px;
`;

const StyledImg = styled.img`
  width: 100%;
  margin-top: 16px;
`;

export default function PictureSubmitBox({ imgSrc, cameraEvent }) {
  return (
    <StyledBox>
      <StyledHead className="page-header">물품 등록</StyledHead>
      <StyledGreenBox className="body2-bold">
        <p>
          판매할 물건들을 모아서 찍어주세요.
          <br />
          <br />
          사진 속 물품을 선택 후 물품을 등록합니다.
        </p>
      </StyledGreenBox>

      <h2 className="body1-header">사진 등록</h2>

      <div>
        <Button name="카메라" buttonClick={() => cameraEvent(true)} />
      </div>
      <StyledImg src={imgSrc} alt="" />
    </StyledBox>
  );
}
