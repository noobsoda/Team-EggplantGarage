import React from "react";
import styled from "styled-components";

const Message = styled.div`
  padding: 8px;
`;

const SendBox = styled.div`
  // border: solid 2px ${({ theme }) => theme.color.graypurple};
  background-color: #DFD5E9;
  float: right;
  border-radius: 8px;
  padding: 12px;
  max-width: 70%;
  display: flex;
  flex-direction: row;
  row-gap: 4px;
`;
const ReceivedBox = styled.div`
  max-width: 70%;
  float: left;
  padding: 12px;
  border-radius: 8px;
  // border: solid 2px ${({ theme }) => theme.color.graypurple};
  background-color: #EEEEEE;
  float: left;
  display: flex;
  flex-direction: row;
  row-gap: 4px;
`;

export default function ChattingMessageItem({
  senderName,
  message,
  sendDate,
  isMine,
}) {
  return (
    <Message>
      {isMine ? ( // 보낸 메시지
        <SendBox>
          <div>{sendDate}</div>
          <div>{message}</div>
        </SendBox>
      ) : (
        // 받은 메시지
        <ReceivedBox>
          <div>{message}</div>
          <div>{sendDate}</div>
        </ReceivedBox>
      )}
    </Message>
  );
}
