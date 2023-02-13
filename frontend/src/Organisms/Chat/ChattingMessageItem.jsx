import React from "react";
import styled from "styled-components";

const Message = styled.div`
  padding: 8px;
`;

const SendBox = styled.div`
  border: solid 2px ${({ theme }) => theme.color.graypurple};
  background-color: ${({ theme }) => theme.color.lightpurple};
  float: right;
  border-radius: 8px;
  padding: 8px;
  max-width: 70%;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;
const ReceivedBox = styled.div`
  max-width: 70%;
  padding: 8px;
  border-radius: 8px;
  border: solid 2px ${({ theme }) => theme.color.graypurple};
  float: left;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export default function ChattingMessageItem({
  senderName,
  message,
  sendDate,
  isMine,
}) {
  const myName = "나"; // 리덕스에서 현재 사용자 이름 가져오기
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
          {/* <div className="body1-header">{senderName}</div> */}
          <div>{message}</div>
          <div>{sendDate}</div>
        </ReceivedBox>
      )}
    </Message>
  );
}
