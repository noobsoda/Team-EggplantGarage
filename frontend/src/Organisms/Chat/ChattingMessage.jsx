import React from "react";
import ChattingMessageItem from "./ChattingMessageItem";
import styled from "styled-components";

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;

  height: calc(100% - 32px);
  overflow-y: scroll;
`;

export default function ChattingMessage({
  chattingMessages,
  senderName,
  myId,
}) {
  return (
    // 채팅 메시지가 존재하면 채팅 말풍선 생성
    <FlexBox>
      {chattingMessages &&
        chattingMessages.map((chattingMessage, i) => (
          <ChattingMessageItem
            key={i}
            // id={chattingMessage.id}
            message={chattingMessage.content}
            senderName={senderName}
            isMine={chattingMessage.senderId === myId}
            sendDate={chattingMessage.sendDate}
          />
        ))}
    </FlexBox>
  );
}
