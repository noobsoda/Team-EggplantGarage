import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
width: calc(100% - 80px);
height: 40px;
border: 1px solid ${({ theme }) => theme.color.lightgrey};
background-color: #f6f7fa;
border-radius: 12px;
color: ${({ theme }) => theme.color.black};
padding: 8px;
box-sizing: border-box;
`;

export default function SearchInput({ onChange, type, value }) {
  return (
    <StyledInput
      type={type}
      className="body1-regular"
      onChange={onChange}
      placeholder="검색어를 입력하세요"
      value={value}
    ></StyledInput>
  );
}
