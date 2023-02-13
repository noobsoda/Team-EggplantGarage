import React from "react";
import InputBox from "../../Atoms/Inputs/BigInput";
import CategorySelect from "../../Molecules/Category/CategorySelect";
import styled from "styled-components";
import { categories } from "../../util/category";

const StyledBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  /* flex: 1 1; */
  /* margin: 24px 24px; */
`;

const StyledHead = styled.h1`
  padding-bottom: 56px;
`;

export default function TitleCategoryBox({
  onTitleChange,
  onCategoryChange,
  categorys,
  delCategory,
}) {
  return (
    <StyledBox>
      <StyledHead className="page-header">라이브 쇼 등록</StyledHead>
      <InputBox
        placehold="방송제목"
        text="제목을 입력해주세요."
        isCheck={true}
        inputValue={onTitleChange}
      />
      <CategorySelect
        options={categories}
        onChange={onCategoryChange}
        categorys={categorys}
        delCategory={delCategory}
      />
    </StyledBox>
  );
}
