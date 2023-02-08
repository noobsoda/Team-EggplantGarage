import { useEffect, useState } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const StyledChatting = styled.div`
  width: 200px;
  height: 30vh;
  border-radius: 8px;
  background-color: white;
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


export default function ChatInput({ inputValue, type, value,myNickname, myLiveId }) {
    const [nickname, setNickname] = useState(myNickname);
    const [liveId, setliveId] = useState(myLiveId);
    const [message, setMessage] = useState("");
    var stompClient = null;
    var messageArea = document.querySelector('#messageArea');
    
    const connect = (event) => {
      console.log("connect");
  
      const socket = new SockJS('/ws/chat');
      stompClient = Stomp.over(socket);
      stompClient.connect({}, connected, error);
      console.log("여기");
  
      event.preventDefault();
    }
  
    const connected = () => {
      console.log("connected!");
    
      stompClient.subscribe("/sub/live/" + liveId, onMessageReceived);
    
      stompClient.send("/pub/live/addUser/" + liveId,
          {},
          JSON.stringify({sender: nickname, type: 'JOIN', roomId: liveId})
      )
    }
  
    const error = (error) => {
      console.log("error!");
    }
    
    const onMessageReceived = (payload) => {
      console.log("onMessageReceived!");
    
      var message = JSON.parse(payload.body);
      console.log("message: " + message.content + " " + message.type + " " + message.sender);
    
      var messageElement = document.createElement('p');
    
      if(message.type === 'JOIN') {
          message.content = '[' + message.sender + '] 님이 입장하셨습니다.';
      } else if (message.type === 'LEAVE') {
          console.log("LEAVE: " + messageElement);
          message.content = '[' + message.sender + '] 님이 퇴장하셨습니다.';
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
    
      messageArea.appendChild(messageElement);
      messageArea.scrollTop = messageArea.scrollHeight;
    }
    
    const sendMessage = (event) => {
      console.log("sendMessage!");
    
      var messageContent = inputValue;
      if(messageContent && stompClient) {
          var chatMessage = {
              sender: nickname,
              roomId: liveId,
              content: inputValue,
              type: 'CHAT'
          };
          stompClient.send("/pub/live/message/" + liveId, {}, JSON.stringify(chatMessage));
          inputValue.value = '';
      }
      event.preventDefault();
  }



  return (
    <StyledContainer>
      <StyledChatting>
        <ul id="messageArea">
          {/* 안녕하세요 */}
        </ul>
      </StyledChatting>
        
        {/* <input type="text" id="message" placeholder="채팅을 입력해주세요."/>
        <button type="submit" class="primary">보내기</button> */}
      <StyledInput
        type={type}
        className="body1-regular"
        onChange={inputValue}
        placeholder="채팅을 입력해주세요"
        value={message}
      ></StyledInput>
      <SendBtn onClick={sendMessage} />
    </StyledContainer>
  );
}
