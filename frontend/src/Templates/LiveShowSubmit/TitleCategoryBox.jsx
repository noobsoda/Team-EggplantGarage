import React from "react";
import InputBox from "../../Atoms/Inputs/BigInput";
import CategorySelect from "../../Molecules/Category/CategorySelect";
import styled from "styled-components";

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

const options = [
  "인기",
  "디지털기기",
  "생활가전",
  "가구",
  "생활/주방",
  "유아용품",
  "유아도서",
  "여성의류",
  "여성잡화",
  "남성의류",
  "남성잡화",
  "뷰티/미용",
  "스포츠",
  "취미/게임",
  "음반",
  "도서",
  "티켓",
  "반려동물",
  "식물",
  "기타",
];

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
        options={options}
        onChange={onCategoryChange}
        categorys={categorys}
        delCategory={delCategory}
      />
    </StyledBox>
  );
}
