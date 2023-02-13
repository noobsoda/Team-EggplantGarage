import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import Body from "../../Templates/Layout/Body";
import ChattingItem from "../../Organisms/Chat/ChattingItem";
import { checkUserInfo } from "../../store/user";
import { getChatRoomList } from "../../util/api/chatApi";

export default function Chat() {
  const [chatRommList, setChatRomList] = useState([]);
  const userInfo = useSelector(checkUserInfo);
  const userId = userInfo.id;
  useEffect(() => {
    getChatRoomList(userId, ({ data }) => {
      setChatRomList(data);
    });
  }, []);
  return (
    <Page>
      <Header isName="True" headerName="채팅 목록" />
      <Body>
        {chatRommList.length === 0 ? (
          <div>
            <span>채팅 목록이 없습니다.</span>
          </div>
        ) : (
          chatRommList.map((chatRoom, i) => {
            return (
              <ChattingItem
                key={chatRoom.chatRoomId}
                id={chatRoom.chatRoomId}
                receiverId={chatRoom.receiverId}
                receiverName={chatRoom.receiverName}
                lastSendTime={chatRoom.lastSendTime}
                lastSendMessage={chatRoom.lastSendMessage}
              />
            );
          })
        )}
      </Body>
    </Page>
  );
}
