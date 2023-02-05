import React, { useState } from "react";
import InputBox from "../../Atoms/Inputs/BigInput";
import Btn from "../../Atoms/Buttons/BigBtn";
import CheckBox from "../../Molecules/Input/CheckBox";
import Link from "../../Atoms/A/Link";
import RedSpan from "../../Atoms/Text/RedSpan";
import styled from "styled-components";

const StyledLoginBox = styled.div`
  width: 280px;
  height: 500px;
  margin: 24px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const StyledHead = styled.h1`
  padding-bottom: 8px;
`;

const StyledColumnDirection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;
const StyledIdPwBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRowCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Login() {
  const [check, setCheck] = useState(false);
  return (
    <StyledLoginBox>
      <StyledHead className="page-header">가지가라지</StyledHead>

      <StyledColumnDirection>
        <StyledIdPwBox>
          <InputBox placehold="아이디" />
          <InputBox placehold="비밀번호" />
        </StyledIdPwBox>
        <CheckBox
          id="id-save"
          text=" 아이디 저장"
          textSize="body2-regular"
          check={check}
          setCheck={setCheck}
        />
        <StyledRowCenter>
          <RedSpan text="아이디 또는 비밀번호가 일치 하지 않습니다." />
        </StyledRowCenter>
        <Btn name="로그인" />
      </StyledColumnDirection>

      <StyledRowCenter>
        <Link link="/signup" value="회원가입" />|
        <Link link="/findpass" value="비밀번호 찾기" />
      </StyledRowCenter>
    </StyledLoginBox>
  );
}
