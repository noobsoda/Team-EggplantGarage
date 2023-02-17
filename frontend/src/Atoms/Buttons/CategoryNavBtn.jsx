import React from "react";
import styled, { css } from "styled-components";

const StyledCategoryBtn = styled.div`
  height: 16.5px;
  padding: 1.5px 10px 0;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};
  border: 2px solid;
  /* box-sizing: border-box; */
  border-color: ${({ theme }) => theme.color.graypurple};
  color: ${({ theme }) => theme.color.graypurple};
  flex: 0 0 auto;
  text-align: center;
  vertical-align: middle;
  margin: 4px 0px;

  ${(props) =>
    props.selected === true &&
    css`
      background-color: ${({ theme }) => theme.color.graypurple};
      color: ${({ theme }) => theme.color.white};
    `};
`;

export default function CategoryNavBtn({ name = "전체", buttonClick, isSelected }) {
  return (
    <>
      <StyledCategoryBtn className="body2-bold" onClick={buttonClick} selected={isSelected}>
        {name}
      </StyledCategoryBtn>
    </>
  );
}
