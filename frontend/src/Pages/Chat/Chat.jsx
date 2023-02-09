import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import Body from "../../Templates/Layout/Body";
import ChattingItem from "../../Organisms/Chat/ChattingItem";

export default function Chat() {
  const chattings = [
    {
      id: 1,
      toUser: "김씨",
      fromUser: "나",
      lastSendTime: "2017-03-17T09:38:51.249+09:00",
      lastSendMessage: "김씨가 보낸 메시지 내용",
    },
    {
      id: 2,
      toUser: "박씨",
      fromUser: "나",
      lastSendTime: "2017-03-18T09:38:51.249+09:00",
      lastSendMessage: "박씨가 보낸 메시지 내용",
    },
    {
      id: 5,
      toUser: "이씨",
      fromUser: "나",
      lastSendTime: "2017-03-19T09:38:51.249+09:00",
      lastSendMessage: "이씨가 보낸 메시지 내용",
    },
  ]; // 리덕스로 가져오기...^^
  return (
    <Page>
      <Header isName="True" headerName="채팅 목록" />
      <Body>
        {chattings.length === 0 ? (
          <div>
            <span>채팅 목록이 없습니다.</span>
          </div>
        ) : (
          chattings.map((chatting, i) => {
            return (
              <ChattingItem
                key={chatting.id}
                id={chatting.id}
                toUser={chatting.toUser}
                fromUser={chatting.fromUser}
                lastSendTime={chatting.lastSendTime}
                lastSendMessage={chatting.lastSendMessage}
              />
            );
          })
        )}
      </Body>
    </Page>
  );
}
