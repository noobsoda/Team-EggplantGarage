import React from "react";
import Header from "../Organisms/Header";
import Page from "../Atoms/Page";
import Body from "../Atoms/Body";
import ExtraSmallButton from "../Atoms/Buttons/ExtraSmallBtn";
import BigInput from "../Atoms/Inputs/BigInput";
import BigSelect from "../Atoms/Select/BigSelect";

export default function InfoEdit() {
  return (
    <Page>
      <Header isName="True" headerName="회원정보수정" />
      <Body>
        <div className="page-header">닉네임</div>
        <ExtraSmallButton name="닉네임수정" />
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
