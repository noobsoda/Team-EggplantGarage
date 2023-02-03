import React from "react";
import styled from "styled-components";

const StyledChatting = styled.div`
  position: absolute;
  left: 40px;
  bottom: 72px;
  width: 200px;
  height: 200px;
  border-radius: 8px;
  background-color: white;
`;

export default function LiveChatting({ chatting }) {
  //채팅 배열로 만들고 맵으로 탐색해서 채팅 뽑아내게
  return <StyledChatting>{chatting}</StyledChatting>;
}
