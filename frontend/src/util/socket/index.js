import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default function getStompClient() {
  const url = process.env.REACT_APP_API_URL + "ws/chat";
  const sockJS = new SockJS(url, null, {
    transports: ["websocket", "xhr-streaming", "xhr-polling"],
  }); // SockJS를 사용하여 Socket 생성
  // Socket 연결
  return Stomp.over(sockJS);
}
