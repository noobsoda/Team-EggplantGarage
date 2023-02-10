import React from "react";
import styled from "styled-components";

const Message = styled.div`
  padding: 8px;
`;

const SendBox = styled.div`
  float: right;
`;
const ReceivedBox = styled.div`
  float: left;
`;

export default function ChattingMessageItem({ senderName, message, sendDate }) {
  const myName = "나"; // 리덕스에서 현재 사용자 이름 가져오기
  return (
    <Message>
      {senderName === myName ? ( // 보낸 메시지
        <SendBox>
          <span>{sendDate}</span>
          <span>{message}</span>
        </SendBox>
      ) : (
        // 받은 메시지
        <ReceivedBox>
          <span>{senderName}</span>
          <span>{message}</span>
          <span>{sendDate}</span>
        </ReceivedBox>
      )}
    </Message>
  );
}
