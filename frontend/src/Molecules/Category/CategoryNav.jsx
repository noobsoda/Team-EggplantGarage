import React, { useState } from "react";
import CategoryNavBtn from "../../Atoms/Buttons/CategoryNavBtn";
import Container from "../../Templates/Layout/Container";
import styled from "styled-components";
import { categories } from "../../util/category";

const StyledContainer = styled.div`
  display: flex;
  // box-sizing: border-box;
  // row-gap: 8px;
  column-gap: 8px;
  overflow-x: scroll;
  margin: auto 0;
  // height: 16px;
  /* &::-webkit-scrollbar  */
  /* display: none; */
  &::-webkit-scrollbar {
    display: none;
  }
`;
/*
	live 내부에 thumbnail, viewercnt , seller_nickname,liveshow_title 등등 뽑혀야됨  
*/
export default function CategoryNav({ setSelected }) {
  //useState , event
  const [select, setSelect] = useState("인기");

  return (
    <StyledContainer>
      {categories.map((name) => {
        return (
          <CategoryNavBtn
            key={name}
            name={name}
            buttonClick={() => {
              setSelected(name);
              setSelect(name);
            }}
            isSelected={name === select}
          />
        );
      })}
    </StyledContainer>
  );
}
