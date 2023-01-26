import React from "react";
import BigInputBox from "../Atoms/Inputs/BigInputBox";

export default function Main() {
  return (
    <div>
      회원가입
      <BigInputBox placehold="이메일" />
      <BigInputBox placehold="비밀번호" />
      <BigInputBox placehold="비밀번호 확인" />
      <BigInputBox placehold="이메일" />
      <BigInputBox placehold="이메일" />
      <BigInputBox placehold="이메일" />
      <BigInputBox placehold="이메일" />
    </div>
  );
}
