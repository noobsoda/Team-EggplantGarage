import React from "react";
import SignUpBox from "../../Templates/SignUp/SignUpEmail";
import Header from "../../Templates/Layout/Header";
import Body from "../../Templates/Layout/Body";
import Page from "../../Templates/Layout/Page";

export default function SignUpEmail() {
  return (
    <Page>
      <Header isName={true} headerName="회원가입" />
      <Body>
        <SignUpBox />
      </Body>
    </Page>
  );
}
