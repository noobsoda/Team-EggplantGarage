import React from "react";
import ProductBox from "../../Molecules/Cards/ProductBox";
import styled from "styled-components";

const StyledBox = styled.div`
  width: 360px;
`;
export default function ProductListBox({ imgSrc, productList }) {
  return (
    <StyledBox>
      <h1 className="page-header">물품 목록</h1>
      {productList.value.map((ele) => {
        return (
          <ProductBox
            key={ele.productName}
            imgSrc={imgSrc}
            name={ele.productName}
            price={ele.productPrice}
            leftTopX={ele.leftTopX}
            rightBottomX={ele.rightBottomX}
            leftTopY={ele.leftTopY}
            rightBottomY={ele.rightBottomY}
          />
        );
      })}
    </StyledBox>
  );
}
