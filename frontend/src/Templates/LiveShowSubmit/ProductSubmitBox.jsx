import React from "react";
import InputBox from "../../Molecules/InputBox";
import Checkbox from "../../Molecules/CheckBox";
import styled from "styled-components";
const StyledBox = styled.div`
  width: 360px;
`;

export default function ProductSubmitBox() {
  return (
    <StyledBox>
      <div>
        <canvas></canvas>
        <button>그리기</button>
        <canvas></canvas>
      </div>
      <InputBox placehold="제품명을 입력하세요" />
      <Checkbox id="price" text="즉시구매가" />
      <InputBox placehold="즉시구매가를 입력하세요" />
    </StyledBox>
  );
}
