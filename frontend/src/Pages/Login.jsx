import React from "react";
import InputBox from "../Atoms/Inputs/BigInputBox";
import Btn from "../Atoms/Buttons/BigBtn";
import CheckBox from "../Molecules/IdSave";
import Link from "../Atoms/A/Link";
import RedSpan from "../Atoms/Text/RedSpan";

export default function Login() {
  return (
    <div>
      <h1 className="page-header">로그인</h1>
      <InputBox placehold="아이디" />
      <InputBox placehold="비밀번호" />
      <CheckBox></CheckBox>
      <RedSpan text="아이디 또는 비밀번호가 일치 하지 않습니다." />
      <Btn name="로그인" />
      <Link link="/signup" value="회원가입" />|
      <Link link="/findpass" value="비밀번호 찾기" />
    </div>
  );
}
