import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//redux
import { useDispatch } from "react-redux";
import { userConfirm } from "../../store/user";

import InputBox from "../../Atoms/Inputs/BigInput";
import Btn from "../../Atoms/Buttons/BigBtn";
import CheckBox from "../../Molecules/Input/CheckBox";
import Link from "../../Atoms/A/Link";
import RedSpan from "../../Atoms/Text/RedSpan";
import styled from "styled-components";

const StyledLoginBox = styled.div`
  /* width: 280px;
  height: 500px;
  margin: 24px 40px;
  ; */
  height: 100%;
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
  row-gap: 8px;
`;
const StyledIdPwBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin-bottom: 8px;
`;

const StyledRowCenter = styled.div`
  display: flex;
  justify-content: center;
`;
const LoginBox = styled.div`
  height: 168px;
`;
export default function Login() {
  const navigate = useNavigate();

  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //redux
  const dispatch = useDispatch();

  /**
   * 로그인 진행
   */
  function loginSubmit() {
    if (email === "") {
      alert("아이디를 입력해주세요");
      return;
    }
    if (password === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }
    console.log("가라");

    dispatch(userConfirm({ email: email, password: password }, navigate));
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
  }
  function onPasswordChange(e) {
    setPassword(e.target.value);
  }
  return (
    <StyledLoginBox>
      <StyledHead className="page-header">가지가라지</StyledHead>

      <StyledColumnDirection>
        <LoginBox>
          <StyledIdPwBox>
            <InputBox
              placehold="아이디"
              inputValue={onEmailChange}
              value={email}
            />
            <InputBox
              placehold="비밀번호"
              inputValue={onPasswordChange}
              value={password}
              type="password"
            />
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
        </LoginBox>

        <Btn name="로그인" buttonClick={loginSubmit} />
      </StyledColumnDirection>

      <StyledRowCenter>
        <Link link="/signup" value="회원가입" />|
        <Link link="/findpass" value="비밀번호 찾기" />
      </StyledRowCenter>
    </StyledLoginBox>
  );
}
