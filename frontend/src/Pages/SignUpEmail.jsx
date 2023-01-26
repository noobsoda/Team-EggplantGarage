import React from "react";
import InputBox from "../Molecules/InputBox";
import InputButtonBox from "../Molecules/InputButtonBox";
import BigInputBox from "../Atoms/Inputs/BigInput";
import BigColorBtn from "../Atoms/Buttons/BigBtn";

export default function SignUpEmail() {
  return (
    <div>
      <InputBox placehold="이메일" text="이미 존재하는 이메일 주소 입니다." isCheck={true} />
      <InputBox placehold="비밀번호" text="8~16이내 !@#$%^&*만 써주세요" isCheck={true} />
      <InputBox placehold="비밀번호 확인" text="비밀번호를 확인해주세요" isCheck={true} />
      <InputBox placehold="닉네임" text="이미 존재하는 닉네임 입니다." isCheck={true} />
      <BigInputBox placehold="이름" />
      <InputButtonBox placehold="휴대폰 번호" buttonName="전송" />
      <InputButtonBox
        placehold="인증번호"
        buttonName="확인"
        text="인증번호가 일치하지 않습니다."
        isCheck={false}
      />
      <BigColorBtn name="가입하기" />
    </div>
  );
}
