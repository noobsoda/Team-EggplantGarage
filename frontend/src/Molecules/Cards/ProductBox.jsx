import React from "react";
import Button from "../../Atoms/Buttons/ExtraSmallBtn";
import ImageBox from "../../Atoms/canvas/ImageBox";
import styled from "styled-components";

const StyledBox = styled.div`
  display: flex;
  width: 280px;
  height: 72px;
  border: 1.5px solid ${({ theme }) => theme.color.red};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 8px;
`;
const StyledInfoBox = styled.div`
  width: 136px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StyledButtonBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export default function ProductBox({
  name,
  price,
  onClick,
  imgSrc,
  leftTopX,
  rightBottomX,
  leftTopY,
  rightBottomY,
}) {
  return (
    <StyledBox>
      <ImageBox
        imgSrc={imgSrc}
        leftTopX={leftTopX}
        rightBottomX={rightBottomX}
        leftTopY={leftTopY}
        rightBottomY={rightBottomY}
        boxSize="75"
      />
      <StyledInfoBox>
        <p className="body1-header">{name}</p>
        <p className="body2-bold">{price}원</p>
      </StyledInfoBox>
      <StyledButtonBox>
        <Button name="수정" buttonClick={onClick}></Button>
      </StyledButtonBox>
    </StyledBox>
  );
}
