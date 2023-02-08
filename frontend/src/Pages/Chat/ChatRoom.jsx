import React from "react";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";

export default function ChatRoom() {
  return (
    <Page>
      <Header isName="True" headerName="채팅방" />
      1:1 채팅을 해봅시다~!
    </Page>
  );
}