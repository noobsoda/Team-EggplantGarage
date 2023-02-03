import React from "react";
import styled from "styled-components";
import PictureBox from "../../Organisms/Camera/PictureBox";

const StyledBox = styled.div`
  width: 360px;
  height: 640px;
`;
const StyledGreenBox = styled.div`
  color: ${({ theme }) => theme.color.green};
`;

export default function PictureSubmitBox({ setOriImgSrc }) {
  return (
    <StyledBox>
      <h1 className="page-header">물품 등록</h1>

      <StyledGreenBox className="body2-bold">
        <p>라이브쇼에서 판매할 물건들을 모아서 찍어주세요.</p>
        <p>사진 내 물품을 선택 후 물품 등록이 시작됩니다.</p>
      </StyledGreenBox>

      <PictureBox setOriImgSrc={setOriImgSrc} />
    </StyledBox>
  );
}
