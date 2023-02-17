import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import Body from "../../Templates/Layout/Body";
import ChattingItem from "../../Organisms/Chat/ChattingItem";
import { checkUserInfo } from "../../store/user";
import { getChatRoomList } from "../../util/api/chatApi";
import styled from "styled-components";

const StyledBox = styled.div`
  /* justify-content: ; */
  width: 100%
  height: 100%;
  margin: 20px 0px;
  // background-color: ${({ theme }) => theme.color.whitegray};
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  overflow-y: scroll;
  padding: 4px;
`;


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
        <StyledBox>
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
        </StyledBox>
      </Body>
    </Page>
  );
}
