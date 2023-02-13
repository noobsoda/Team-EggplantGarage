import React from "react";
import Button from "../../Atoms/Buttons/ExtraSmallBtn";
import ButtonStroke from "../../Atoms/Buttons/ExtraSmallStrokeBtn";
import ImageBox from "../../Atoms/canvas/ImageBox";
import styled from "styled-components";

const StyledBox = styled.div`
  display: flex;
  /* flex: 1; */
  width: calc(100% - 8px);
  height: 72px;
  border: 1.5px solid ${({ theme }) => theme.color.red};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 8px;
  column-gap: 8px;
`;
const StyledInfoBox = styled.div`
  width: calc(100% - 164px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StyledButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

export default function ProductBox({
  id,
  name,
  price,
  onModifyClick,
  onDeleteClick,
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
        <Button name="수정" buttonClick={() => onModifyClick(id)}></Button>
        <ButtonStroke
          name="제거"
          buttonClick={() => onDeleteClick(id)}
        ></ButtonStroke>
      </StyledButtonBox>
    </StyledBox>
  );
}
