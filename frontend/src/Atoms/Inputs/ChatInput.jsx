import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { getStompClient } from "../../store/socket";
import { useLocation } from "react-router-dom";

const StyledChatting = styled.div`
  width: 200px;
  height: 30vh;
  border-radius: 8px;
  background-color: white;
`;

const StyledMessage = styled.ul`

`;

const StyledContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  align-items: center;
`;
const StyledInput = styled.input`
  width: calc(100% - 32px);
  height: 40px;
  border: 2px solid ${({ theme }) => theme.color.white};
  border-radius: 8px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0);
  color: ${({ theme }) => theme.color.white};
  padding: 0 8px;
`;
const SendBtn = styled.button`
  width: 24px;
  height: 24px;
  background: url("/image/liveshow/send-icon.svg") no-repeat 0px 0px;
  //gradient 속성 찾기
  /* &::-webkit-mask-image: -webkit-gradient(
    linear,
    left 50%,
    left bottom,
    to(rgba(0, 0, 0, 1)),
    from(rgba(0, 0, 0, 0))
  ); */
`;


export default function ChatInput({ inputValue, type, value,myNickname }) {
  // const [nickname, setNickname] = useState(myNickname);
  const nickname = "홍길동";
  const [chatting, setChatting] = useState([]);
  const [message, setMessage] = useState("");
  const stompClient = getStompClient();
  // const liveId = useLocation().state.liveId;
  const liveId = 1;
  const messageArea = useRef();
  const scrollRef = useRef();

  console.log("liveId: " + liveId);
  // var messageArea = document.querySelector('#messageArea');
  console.log(messageArea);
  console.log(messageArea.current);

  
  
  const connect = () => {
    console.log("connect");
  
    console.log("stompClient: " + stompClient);
    stompClient.connect({}, connectSuccess, connectError);
    console.log("여기");
  }
  
  useEffect(() => {
    console.log("useEffect!");

    if (stompClient === null) {
      return;
    } 
    connect();
  }, []);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);


  const connectSuccess = () => {
    console.log("connectSuccess!");
    console.log("stompClient: " + stompClient);
  
    stompClient.subscribe("/sub/live/" + liveId, onMessageReceived);
  
    stompClient.send("/pub/live/addUser/" + liveId,
        {},
        JSON.stringify({sender: nickname, type: 'JOIN', roomId: liveId})
    )
  }

  const connectError = (error) => {
    console.log("connectError!");
  }
  
  const onMessageReceived = (payload) => {
    console.log("onMessageReceived!");
  
    var message = JSON.parse(payload.body);
    console.log("message: " + message.content + " " + message.type + " " + message.sender);
  
    var messageElement = document.createElement('p');

    if(message.type === 'JOIN') {
        message.content = '[' + message.sender + '] 님이 입장하셨습니다.';
    } else if (message.type === 'LEAVE') {
        // console.log("LEAVE: " + messageElement);
        // message.content = '[' + message.sender + '] 님이 퇴장하셨습니다.';
    } else {
        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode("[" + message.sender + "] ");
        console.log("sender: " + message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }
  
    var textElement = document.createElement('span');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);
  
    messageElement.appendChild(textElement);
  
    messageArea.current.appendChild(messageElement);
    // messageArea.scrollTop = messageArea.scrollHeight;
  }
  
  const sendMessage = () => {
    console.log("sendMessage!");
  
    console.log("보내기: " + message + " " + stompClient);
    if (message && stompClient) {
      var chatMessage = {
        sender: nickname,
        roomId: liveId,
        content: message,
        type: 'CHAT'
      };
      stompClient.send("/pub/live/message/" + liveId, {}, JSON.stringify(chatMessage));
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    setMessage("");
    // event.preventDefault();
  }

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      sendMessage();
    }
  };

  const inputChangeHandler = (event) => {
    setMessage(event.target.value)
  }

  return (
    <StyledContainer>
      <StyledChatting ref={scrollRef}>
        <StyledMessage ref={messageArea} />
      </StyledChatting> 
      
      <StyledInput
        type="text"
        className="body1-regular"
        onChange={inputChangeHandler}
        placeholder="메세지를 입력해주세요"
        value={message}
        onKeyPress={onKeyPress}
      ></StyledInput>
      <SendBtn onClick={sendMessage} />
    </StyledContainer>
  );
}