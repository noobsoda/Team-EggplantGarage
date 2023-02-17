import { useEffect, useRef } from "react";
import styled from "styled-components";
import MessageLive from "../../Atoms/Text/MessageLive";

const StyledChatting = styled.div`
  padding: 8px;
  width: calc(100% - 100px);
  height: 30vh;
  color: white;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  row-gap: 8px;
  /* font-family: "Inter"; */
  font-style: normal;
  font-weight: 700;
  /* font-size: 16px; */
  /* line-height: 15px; */

  /* border-radius: 8px; */
  /* background-color: white; */
  -webkit-mask-image: linear-gradient(transparent, black);
  mask-image: linear-gradient(transparent, black);
  background-color: rgb(0, 0, 0, 0.4);
  overflow-y: scroll;
  /* overflow: auto; */
  border-radius: 8px;
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
  width: calc(100% - 80px);
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
`;
const FlexBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  justify-content: flex-end;
`;
export default function ChatInput({
  message,
  setMessage,
  messageList,
  stompClient,
  sendMessage,
}) {
  const scrollRef = useRef();

  useEffect(() => {
    if (stompClient === null) {
      return;
    }
    // scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    setTimeout(() => {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 0);
  }, [messageList]);

  /**
   * enter입력
   * @param {*} e
   */
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  /**
   * 입력 이벤트
   * @param {*} event
   */
  const inputChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  return (
    <FlexBox>
      <StyledChatting ref={scrollRef}>
        <div style={{ height: "30vh" }}>　</div>
        {messageList.map((msg, i) => (
          <MessageLive key={i + msg} message={msg} />
        ))}
      </StyledChatting>

      <StyledContainer>
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
    </FlexBox>
  );
}
