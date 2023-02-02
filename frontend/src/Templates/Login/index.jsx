import React from "react";
import InputBox from "../../Atoms/Inputs/BigInput";
import Btn from "../../Atoms/Buttons/BigBtn";
import CheckBox from "../../Molecules/IdSaveBox";
import Link from "../../Atoms/A/Link";
import RedSpan from "../../Atoms/Text/RedSpan";
import styled from "styled-components";

const StyledColumnDirection = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRowCenter = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLoginBox = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Login() {
  return (
    <div>
      <h1 className="page-header">로그인</h1>
      <StyledLoginBox>
        <StyledColumnDirection>
          <StyledColumnDirection>
            <InputBox placehold="아이디" />
            <InputBox placehold="비밀번호" />
          </StyledColumnDirection>
          <CheckBox></CheckBox>
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
    </div>
  );
}
