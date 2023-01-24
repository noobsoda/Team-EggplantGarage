import React from "react";
import InputBox from "../Atoms/Inputs/BigInputBox";
import CheckBox from "../Molecules/IdSave";

export default function Login() {
  return (
    <div>
      로그인이요
      <InputBox placehold="아이디" />
      <InputBox placehold="비밀번호" />
      <CheckBox></CheckBox>
    </div>
  );
}
