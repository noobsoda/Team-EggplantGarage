import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: calc(100% - 80px);
  height: 40px;
  border: 2px solid ${({ theme }) => theme.color.darkgrey};
  border-radius: 16px;
  color: ${({ theme }) => theme.color.black};
  padding: 8px;
  box-sizing: border-box;
`;

export default function SearchInput({ inputValue, type, value }) {
  return (
    <StyledInput
      type={type}
      className="body1-regular"
      onChange={inputValue}
      placeholder="검색어를 입력하세요"
      value={value}
    ></StyledInput>
  );
}
