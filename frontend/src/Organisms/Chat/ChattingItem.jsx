import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  /* justify-content: ; */
`;

export default function ChattingItem({
  id,
  receiverId,
  receiverName,
  lastSendTime,
  lastSendMessage,
}) {
  const navigate = useNavigate();

  const room = () => {
    navigate(`/chat/room`, {
      state: {
        chatRoomId: id,
        receiverId: receiverId,
        receiverName: receiverName,
      },
    });
    window.location.reload(`/chat/room`);
  };
  return (
    <StyledBox onClick={room}>
      <div>{receiverName}님과의 채팅</div>
      <div>
        {lastSendMessage !== null ? (
          lastSendMessage.length < 15 ? (
            lastSendMessage
          ) : (
            lastSendMessage.slice(0, 15) + "..."
          )
        ) : (
          <div></div>
        )}
      </div>
      <div>{lastSendTime}</div>
    </StyledBox>
  );
}
