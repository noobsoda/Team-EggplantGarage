import React from "react";
import ProductBox from "../../Molecules/ProductBox";
import styled from "styled-components";

const StyledBox = styled.div`
  width: 360px;
`;
export default function ProductListBox() {
  return (
    <StyledBox>
      <h1 className="page-header">물품 목록</h1>
      <ProductBox name="물품명" price="10000" />
    </StyledBox>
  );
}
