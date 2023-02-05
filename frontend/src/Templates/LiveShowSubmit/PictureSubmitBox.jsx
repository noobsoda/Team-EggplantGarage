import React from "react";
import styled from "styled-components";
import Button from "../../Atoms/Buttons/ExtraSmallBtn";

const StyledBox = styled.div`
  width: 360px;
  height: 640px;
`;
const StyledGreenBox = styled.div`
  color: ${({ theme }) => theme.color.green};
`;

const StyledImg = styled.img`
  width: 360px;
`;

export default function PictureSubmitBox({ imgSrc, cameraEvent }) {
  return (
    <StyledBox>
      <h1 className="page-header">물품 등록</h1>

      <StyledGreenBox className="body2-bold">
        <p>라이브쇼에서 판매할 물건들을 모아서 찍어주세요.</p>
        <p>사진 내 물품을 선택 후 물품 등록이 시작됩니다.</p>
      </StyledGreenBox>

      <h2 className="body1-header">사진 등록</h2>

      <div>
        <Button name="카메라" buttonClick={() => cameraEvent(true)} />
        <Button name="앨범" />
      </div>
      <StyledImg src={imgSrc} alt="" />
    </StyledBox>
  );
}
