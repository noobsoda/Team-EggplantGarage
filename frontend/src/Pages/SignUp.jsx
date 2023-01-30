import React from "react";
import { useNavigate } from "react-router-dom";
import BigBtn from "../Atoms/Buttons/BigBtn";
import Tapbar from "../Organisms/Tapbar";

export default function SignUp() {
  const navigate = useNavigate();
  function goToEmail() {
    navigate("/signupemail");
  }
  return (
    <div>
      회원가입
      <BigBtn name="이메일로 가입하기" buttonClick={goToEmail}></BigBtn>
      <Tapbar />
    </div>
  );
}
