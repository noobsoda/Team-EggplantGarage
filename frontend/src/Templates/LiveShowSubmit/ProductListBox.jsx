import React from "react";
import ProductBox from "../../Molecules/Cards/ProductBox";
import styled from "styled-components";

const StyledBox = styled.div`
  width: 282px;
  margin: 24px 40px;
`;
const StyledHead = styled.h1`
  padding-bottom: 16px;
`;

const StyledListBox = styled.div`
  height: 384px;
  overflow: scroll;
`;
export default function ProductListBox({
  imgSrc,
  productList,
  onModifyClick,
  onDeleteClick,
}) {
  return (
    <StyledBox>
      <StyledHead className="page-header">물품 목록</StyledHead>
      <StyledListBox>
        {productList.value.map((ele) => {
          return (
            <ProductBox
              key={ele.id}
              id={ele.id}
              imgSrc={imgSrc}
              name={ele.productName}
              price={ele.productPrice}
              leftTopX={ele.leftTopX}
              rightBottomX={ele.rightBottomX}
              leftTopY={ele.leftTopY}
              rightBottomY={ele.rightBottomY}
              onModifyClick={onModifyClick}
              onDeleteClick={onDeleteClick}
            />
          );
        })}
      </StyledListBox>
    </StyledBox>
  );
}
