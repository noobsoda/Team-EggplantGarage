import React from "react";
import styled from "styled-components";
import { format, render, cancel, register } from "timeago.js";
import koLocale from "timeago.js/lib/lang/ko";
import { motion } from "framer-motion";
register("ko", koLocale);

const Message = styled.div`
  padding: 8px;
`;
const FlexBox1 = styled(motion.div)`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  justify-content: flex-end;
`;
const FlexBox2 = styled(motion.div)`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  justify-content: flex-start;
`;
const SendBox = styled.div`
  // border: solid 2px ${({ theme }) => theme.color.graypurple};
  background-color: #dfd5e9;
  border-radius: 8px;
  padding: 12px;
  max-width: 70%;
`;
const ReceivedBox = styled.div`
  max-width: 70%;
  padding: 12px;
  border-radius: 8px;
  // border: solid 2px ${({ theme }) => theme.color.graypurple};
  background-color: ${({ theme }) => theme.color.whitegray}; ;
`;
const DateBox = styled.div`
  color: ${({ theme }) => theme.color.grey};
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export default function ChattingMessageItem({ message, sendDate, isMine }) {
  return (
    <Message>
      {isMine ? ( // 보낸 메시지
        <FlexBox1 positionTransition initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
          <DateBox className="body3-bold">{format(sendDate, "ko")}</DateBox>
          <SendBox>
            <div>{message}</div>
          </SendBox>
        </FlexBox1>
      ) : (
        // 받은 메시지

        <FlexBox2 positionTransition initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
          <ReceivedBox>
            <div>{message}</div>
          </ReceivedBox>
          <DateBox className="body3-bold">{format(sendDate, "ko")}</DateBox>
        </FlexBox2>
      )}
    </Message>
  );
}
