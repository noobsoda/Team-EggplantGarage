import React from "react";
import styled from "styled-components";
const StyledContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  align-items: center;
`;
const StyledInput = styled.input`
  width: calc(100% - 32px);
  height: 40px;
  border: 2px solid ${({ theme }) => theme.color.white};
  border-radius: 8px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0);
  color: ${({ theme }) => theme.color.white};
  padding: 0 8px;
`;
const SendBtn = styled.button`
  width: 24px;
  height: 24px;
  background: url("/image/liveshow/send-icon.svg") no-repeat 0px 0px;
  //gradient 속성 찾기
  /* &::-webkit-mask-image: -webkit-gradient(
    linear,
    left 50%,
    left bottom,
    to(rgba(0, 0, 0, 1)),
    from(rgba(0, 0, 0, 0))
  ); */
`;

export default function ChatInput({ inputValue, type, value }) {
  return (
    <StyledContainer>
      <StyledInput
        type={type}
        className="body1-regular"
        onChange={inputValue}
        placeholder="채팅을 입력해주세요"
        value={value}
      ></StyledInput>
      <SendBtn />
    </StyledContainer>
  );
}
