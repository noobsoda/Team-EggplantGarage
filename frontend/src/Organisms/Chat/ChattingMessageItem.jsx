import React from "react";

export default function ChattingMessageItem({ senderName, message, sendDate }) {
  const myName = "나"; // 리덕스에서 현재 사용자 이름 가져오기
  return (
    <div>
      {senderName === myName ? ( // 보낸 메시지
        <div>
          <span>{sendDate}</span>
          <span>{message}</span>
        </div>
      ) : (
        // 받은 메시지
        <div>
          <div>
            <span>{senderName}</span>
            <span>{message}</span>
            <span>{sendDate}</span>
          </div>
        </div>
      )}
    </div>
  );
}
