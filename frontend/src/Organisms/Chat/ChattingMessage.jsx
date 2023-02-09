import React from "react";
import ChattingMessageItem from "./ChattingMessageItem";

export default function ChattingMessage({ chattingMessages }) {
  return (
    // 채팅 메시지가 존재하면 채팅 말풍선 생성
    <div>
      {chattingMessages &&
        chattingMessages.map((chattingMessage, i) => (
          <ChattingMessageItem
            key={i}
            // id={chattingMessage.id}
            message={chattingMessage.content}
            senderName={"나"}
            sendDate={chattingMessage.sendDate}
          />
        ))}
    </div>
  );
}
