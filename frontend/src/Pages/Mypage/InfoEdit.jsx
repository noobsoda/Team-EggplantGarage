import React from "react";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import Body from "../../Templates/Layout/Body";
import ExtraSmallButton from "../../Atoms/Buttons/ExtraSmallBtn";
import BigInput from "../../Atoms/Inputs/BigInput";

export default function InfoEdit() {
  return (
    <Page>
      <Header isName={true} headerName="회원정보수정" />
      <Body>
        <div className="body1-header">닉네임</div>
        <BigInput placehold="새로운 닉네임" />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ExtraSmallButton name="수정" color="white" />
        </div>
        <div className="body1-header">비밀번호</div>
        <BigInput placehold="현재 비밀번호" />
        <BigInput placehold="새로운 비밀번호" />
        <BigInput placehold="새로운 비밀번호 확인" />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ExtraSmallButton name="수정" color="white" />
        </div>
        <div className="body1-header">계좌</div>
        {/* <BigSelect /> */}
        <BigInput placehold="은행명" />
        <BigInput placehold="계좌번호" />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ExtraSmallButton name="등록/수정" color="white" />
        </div>
      </Body>
    </Page>
  );
}
