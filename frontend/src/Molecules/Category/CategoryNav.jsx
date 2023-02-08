import React, { useState } from "react";
import CategoryNavBtn from "../../Atoms/Buttons/CategoryNavBtn";
import Container from "../../Templates/Layout/Container";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  // box-sizing: border-box;
  // row-gap: 8px;
  column-gap: 8px;
  overflow-x: scroll;
  // height: 16px;
`;
/*
	live 내부에 thumbnail, viewercnt , seller_nickname,liveshow_title 등등 뽑혀야됨  
*/
export default function CategoryNav({ setSelected }) {
  //useState , event
  const categories = [
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

  return (
    <StyledContainer>
      {categories.map((name) => {
        return (
          <CategoryNavBtn
            key={name}
            name={name}
            buttonClick={() => {
              setSelected(name);
            }}
          />
        );
      })}
    </StyledContainer>
  );
}
