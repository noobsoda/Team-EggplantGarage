import React from "react";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import Body from "../../Templates/Layout/Body";
import ExtraSmallButton from "../../Atoms/Buttons/ExtraSmallBtn";
import BigInput from "../../Atoms/Inputs/BigInput";

export default function InfoEdit() {
  return (
    <Page>
      <Header isName="True" headerName="회원정보수정" />
      <Body>
        <div className="body1-header">닉네임</div>
        <BigInput placehold="현재 닉네임" />
        <ExtraSmallButton name="변경" />
        <div className="body1-header">비밀번호</div>
        <BigInput placehold="현재 비밀번호를 입력하세요" />
        <hr></hr>
        <BigInput placehold="변경될 비밀번호를 입력하세요" />
        <BigInput placehold="비밀번호 확인" />
        <ExtraSmallButton name="수정" />
        <div className="body1-header">비밀번호</div>
        {/* <BigSelect /> */}
        <BigInput placehold="은행입력" />
        <BigInput placehold="계좌번호입력" />
        <ExtraSmallButton name="등록/수정" />
      </Body>
    </Page>
  );
}
