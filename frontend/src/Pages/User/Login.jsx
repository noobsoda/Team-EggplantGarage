import React from "react";
import LoginTemplate from "../../Templates/Login";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
export default function Login() {
  return (
    <Page>
      <Header isName={true} headerName="로그인" />
      <LoginTemplate />
    </Page>
  );
}
