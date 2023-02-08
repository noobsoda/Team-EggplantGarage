import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import { getStompClient } from "../../store/socket";

const ChattingMessageItem = ({ user, message, sendDate, toUser }) => {
  const name = "나"; // 리덕스에서 현재 사용자 이름 가져오기
  return (
    <div>
      {user === name ? ( // 보낸 메시지
        <div>
          <span>{sendDate}</span>
          <span>{message}</span>
        </div>
      ) : (
        // 받은 메시지
        <div>
          <div>
            <span>{user}</span>
            <span>{message}</span>
            <span>{sendDate}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const ChattingMessage = ({ chattingMessages, toUser }) => {
  return (
    // 채팅 메시지가 존재하면 채팅 말풍선 생성
    <div>
      {chattingMessages &&
        chattingMessages.map((chattingMessage, i) => (
          <ChattingMessageItem
            key={i}
            id={chattingMessage.id}
            message={chattingMessage.message}
            user={chattingMessage.user.name}
            sendDate={chattingMessage.sendDate}
            toUser={toUser}
          />
        ))}
    </div>
  );
};

export default function ChatRoom() {
  const roomId = useLocation().state.roomId; // 현재 URL을 통해 RoomId를 얻어옴
  const [chattingMessages, setChattingMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(1); // 리덕스로 초기값 가져오기로 수정
  const [users, setUserList] = useState([]);
  const [toUser, setToUser] = useState({});
  const stompClient = getStompClient();
  const scrollRef = useRef();
  let navigate = useNavigate();

  // 채팅 메시지 배열에 새로운 메시지 추가
  const addMessage = (message) => {
    setChattingMessages((prev) => [...prev, message]);
  };

  // stomp를 이용하여 메시지 전송
  const connect = () => {
    stompClient.connect(
      {},
      () => {
        stompClient.subscribe("/sub/chat/room/" + roomId, (data) => {
          const newMessage = JSON.parse(data.body);
          addMessage(newMessage);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // 처음 컴포넌트가 새롭게 생성되는 시점에 한 번 실행
  // 백엔드 서버에 데이터를 요청할 때 axios 작업할 때 사용
  useEffect(() => {
    if (stompClient === null) {
      return;
    }
    connect();
    // dispatch의 내부에 있는 chattingMessageList라는 함수의 액션 객체를 반환 받아 setChattingMessages, setUserList 하도록 로직 추가 필요 
    setChattingMessages([]);
    setUserList([]);
  }, []);

  // 의존성 변수 users가 변경될 때만 함수 호출
  useEffect(() => {
    users.map((user) => user.id != userId && setToUser(user));
  }, [users]);

  // 의존성 변수 chattingMessages가 변경될 때만 함수 호출
  // 새로운 메시지가 생성될때 채팅 스크롤
  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chattingMessages]);

  // Stomp를 이용하여 메시지 전송
  const sendMessage = () => {
    if (message != "") {
      stompClient.send(
        "/pub/message",
        {},
        JSON.stringify({
          message: message,
          user: { id: userId },
          chatRoom: { id: roomId },
        })
      );
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    setMessage("");
  };

  // Enter를 누르면 메시지 보냄
  // 전송버튼 클릭시 전송도 추가 구현 필요
  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      sendMessage();
    }
  };

  return (
    <Page>
      <Header isName="True" headerName="채팅방" />
    </Page>
  );
}
