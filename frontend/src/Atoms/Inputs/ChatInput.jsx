import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  width: calc(100% - 8px);
  height: 40px;
  position: absolute;
  bottom: 16px;
  left: 40px;
`;
const StyledInput = styled.input`
  width: 264px;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.color.white};
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0);
  color: ${({ theme }) => theme.color.white};
  padding: 0 8px;
`;
const SendBtn = styled.button`
  position: absolute;
  left: 248px;
  top: 9.6px;
  width: 24px;
  height: 24px;
  background: url("/image/liveshow/send-icon.svg") no-repeat 0px 0px;
`;

export default function ChatInput({ placehold, inputValue, type, value }) {
  return (
    <Wrapper>
      <StyledInput
        type={type}
        className="body1-regular"
        onChange={inputValue}
        placeholder={placehold}
        value={value}
      ></StyledInput>
      <SendBtn />
    </Wrapper>
  );
}
