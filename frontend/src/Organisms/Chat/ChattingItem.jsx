import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { format, render, cancel, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  /* justify-content: ; */
  width: calc(100% - 41x);
  height: 56px;
  padding: 16px;
  border-radius: 16px;
  border: solid 2px;
  border-color: ${({ theme }) => theme.color.red};
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
  register("ko", koLocale);
  return (
    <StyledBox onClick={room}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div className="body1-header">{receiverName}</div>
        {/* <div>{lastSendTime}</div> */}
        <div>{format(lastSendTime, "ko")}</div>
      </div>
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
    </StyledBox>
  );
}
