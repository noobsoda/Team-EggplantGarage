import React from "react";
import InputBox from "../../Atoms/Inputs/BigInputBox";
import CategoryBox from "../../Organisms/CategoryBox";
import styled from "styled-components";

const StyledBox = styled.div`
  width: 360px;
`;

export default function TitleCategoryBox() {
  return (
    <StyledBox>
      <h1 className="page-header">라이브쇼 등록</h1>
      <InputBox
        placehold="방송제목"
        text="제목을 입력해주세요."
        isCheck={true}
      />
      <CategoryBox />
    </StyledBox>
  );
}
