import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";

const ChattingItem = ({ id, toUser, fromUser, lastSendTime, lastSendMessage }) => {
  const [toUserName, setToUserName] = useState(toUser);
  const [toUserId, setToUserId] = useState(0);
  const navigate = useNavigate();

  // toUserName이 변경될 때만 함수 호출
  useEffect(() => {
    const name = "박싸피"; // 현재 유저 (리덕스에서 가져오기)
    if (name === toUser) {
      // 현재 유저 = 받는 사람
      setToUserName(fromUser);
      // dispatch의 내부에 있는 findByName라는 함수의 액션 객체를 반환 받아 setToUserId 하도록 로직 추가 필요
      setToUserId(1);
    } else {
      // 현재 유저 = 보내는 사람
      setToUserName(toUser);
      // dispatch의 내부에 있는 findByName라는 함수의 액션 객체를 반환 받아 setToUserId 하도록 로직 추가 필요
      setToUserId(2);
    }
  }, [toUserName]);

  // onClick event가 발생할 때, '/chat/room'으로 이동하여 1:1 채팅방 입장
  const room = () => {
    navigate(`/chat/room`, { state: { roomId: id, userName: toUserName } });
    window.location.reload(`/chat/room`);
  };
  return (
    <div>
      <div onClick={room}>
        <div>
          <div>{toUserName}</div>
          <div>{lastSendMessage !== null ? lastSendMessage.length < 15 ? lastSendMessage : lastSendMessage.slice(0, 15) + "..." : <div></div>}</div>
        </div>
        <div>
          <div>{lastSendTime}</div>
        </div>
      </div>
    </div>
  );
};

export default function Chat() {
  const chattings = [
    { id: 1, toUser: "김씨", fromUser: "나", lastSendTime: "2017-03-17T09:38:51.249+09:00", lastSendMessage: "김씨가 보낸 메시지 내용" },
    { id: 2, toUser: "박씨", fromUser: "나", lastSendTime: "2017-03-18T09:38:51.249+09:00", lastSendMessage: "박씨가 보낸 메시지 내용" },
    { id: 3, toUser: "이씨", fromUser: "나", lastSendTime: "2017-03-19T09:38:51.249+09:00", lastSendMessage: "이씨가 보낸 메시지 내용" },
  ]; // 리덕스로 가져오기...^^
  return (
    <Page>
      <Header isName="True" headerName="채팅 목록" />
      <div>
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
      </div>
    </Page>
  );
}
