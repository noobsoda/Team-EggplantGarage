import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});

export default function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("chat message", (message) => {
      setLastPong(message);
    });

    return () => {
      //소켓 접속 종료
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat message");
    };
  }, []);
  const sendPing = () => {
    socket.emit("chat message");
  };

  //소켓으로 메시지전송하기
  function sendMsg() {
    socket.emit("chat message", text); // 소켓으로 보내기
    setText("");
  }

  function onChangeValue(e) {
    setText(e.target.value);
  }

  return (
    <div>
      <div>
        <ul id="messages"></ul>
      </div>
      <div>
        <input id="message" type="text" value={text} onChange={onChangeValue} />
        <button id="messageSubmit" onClick={sendMsg}>
          입력
        </button>
      </div>
      <p>Connected: {"" + isConnected}</p>
      <p>Last pong: {lastPong || "-"}</p>
      <button onClick={sendPing}>Send ping</button>
    </div>
  );
}
