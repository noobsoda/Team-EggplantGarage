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
  toUser,
  fromUser,
  lastSendTime,
  lastSendMessage,
}) {
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
    <StyledBox onClick={room}>
      <div>{toUserName}</div>
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
