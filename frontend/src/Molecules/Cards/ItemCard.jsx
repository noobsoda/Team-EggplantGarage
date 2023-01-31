import React from "react";
import styled from "styled-components";

const StyledItemCard = styled.div`
  width: 280px;
  height: 72px;
  border-radius: 8px;
  border: 1.5px solid #d3385a;
  background-color: ${({ theme }) => theme.color.white};
  display: flex;
`;
const ItemImage = styled.div`
  width: 72px;
  height: 72px;
  border: 1.5px solid #d3385a;
  border-radius: 8px 0px 0px 8px;
  //   background: url(${(props) => props.imgSrc}) no-repeat 0px 0px;
  background: url(./image/item-sample.png);
  background-size: cover;
`;
const ItemInfo = styled.div`
  width: 136px;
  height: 72px;
  background-color: grey;
`;
const ItemBtn = styled.div`
  width: 72px;
  height: 72px;
  background-color: yellow;
`;
export default function ItemCard({ item, button1Click, button2Click }) {
  return (
    <StyledItemCard>
      <ItemImage />
      <ItemInfo></ItemInfo>
      <ItemBtn></ItemBtn>
    </StyledItemCard>
  );
}
