import React from "react";
import Tapbar from "../Organisms/Tapbar";
import ChatRoomBox from "../Molecules/ChatRoomBox";

export default function Chat() {
  return (
    <div>
      <div>
        <ChatRoomBox />
      </div>
      <Tapbar />
    </div>
  );
}
