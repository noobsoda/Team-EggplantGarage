import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 280px;
  height: 40px;
  position: absolute;
  left: 40px;
`;

const SendBtn = styled.button`
  position: absolute;
  left: 256px;
  top: 9.6px;
  width: 24px;
  height: 24px;
  background: url("/image/search-small-icon.svg") no-repeat 0px 0px;
`;

const StyledInput = styled.input`
  width: 280px;
  height: 40px;

  border: 2px solid ${({ theme }) => theme.color.darkgrey};
  border-radius: 8px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.color.black};
`;

export default function SearchInput({ inputValue, type, value }) {
  return (
    <Wrapper>
      <StyledInput
        type={type}
        className="body1-regular"
        onChange={inputValue}
        placeholder="검색어를 입력하세요"
        value={value}
      ></StyledInput>
      <SendBtn></SendBtn>
    </Wrapper>
  );
}
