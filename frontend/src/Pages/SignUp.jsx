import React from "react";
import { useNavigate } from "react-router-dom";
import BigButton from "../Atoms/Buttons/BigButtonColor";

export default function Main() {
  const navigate = useNavigate();
  function goToEmail() {
    navigate("/signupemail");
  }
  return (
    <div>
      회원가입
      <BigButton name="이메일로 가입하기" buttonClick={goToEmail}></BigButton>
    </div>
  );
}
