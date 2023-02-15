import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { format, render, cancel, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 8px;
  /* justify-content: ; */
  width: calc(100% - 41x);
  height: 40px;
  padding: 16px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.whitegray};
  // border: solid 1px ${({ theme }) => theme.color.lightgrey};
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
`;

const StyledText = styled.div`
  ${(props) => {
    if (props.color === "purple") {
      return css`
        color: ${({ theme }) => theme.color.purple};
      `;
    }
    if (props.color === "gray") {
      return css`
        color: ${({ theme }) => theme.color.grey};
      `;
    }
  }};
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
      <StyledRow>
        <StyledText className="body1-header">{receiverName}</StyledText>
        <StyledText className="body1-header" color="purple">
          {format(lastSendTime, "ko")}
        </StyledText>
      </StyledRow>
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
