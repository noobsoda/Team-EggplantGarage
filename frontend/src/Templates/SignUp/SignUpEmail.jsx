import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../../Molecules/Input/InputBox";
import InputButtonBox from "../../Molecules/Input/InputButtonBox";
import BigInputBox from "../../Atoms/Inputs/BigInput";
import BigColorBtn from "../../Atoms/Buttons/BigBtn";
import styled from "styled-components";
import { passwordReg, emailReg, isNumber } from "../../util/regex";
import { emailCheck, nickNameCheck, signup } from "../../util/api/userApi";

const StyledMainBody = styled.div`
  width: clac(80%)
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const StyledHead = styled.h1`
  display: flex;
  margin: 32px 0px;
  padding-bottom: 8px;
  justify-content: center;
`;

const StyledRowCenter = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(80%);
  justify-content: center;
  margin: 0 auto;
  row-gap: 12px;
`;

export default function SignUpEmail() {
  const navigate = useNavigate();

  const [email, setEmail] = useState({ value: "", check: true });
  const [password, setPassword] = useState({ value: "", check: true });
  const [password2, setPassword2] = useState({ value: "", check: true });
  const [nickName, setNickName] = useState({ value: "", check: true });
  const [name, setName] = useState({ value: "", check: true });
  const [phone, setPhone] = useState({ value: "", check: true });

  function emailValue(e) {
    if (e.target.value !== "") {
      emailCheck(
        e.target.value,
        () => {
          setEmail({ value: e.target.value, check: true });
        },
        () => {
          //중복
          setEmail({ value: e.target.value, check: false });
        }
      );
    } else {
      setEmail({ value: "", check: true });
    }
  }
  function passwordValue(e) {
    let isPassword = false;
    //정규 표현식 적용
    if (e.target.value.match(passwordReg)) {
      isPassword = true;
    }
    setPassword({ value: e.target.value, check: isPassword });
  }
  //닉네임 입력
  function nickNameValue(e) {
    if (e.target.value !== "") {
      nickNameCheck(
        e.target.value,
        () => {
          setNickName({ value: e.target.value, check: true });
        },
        () => {
          //중복
          setNickName({ value: e.target.value, check: false });
        }
      );
    } else {
      setNickName({ value: e.target.value, check: true });
    }
  }
  //이름 입력
  function nameValue(e) {
    setName({ value: e.target.value, check: true });
  }
  //핸드폰 입력
  function phoneValue(e) {
    setPhone({ value: e.target.value, check: true });
  }

  function passwordValueCheck(e) {
    let isPassword = false;
    if (e.target.value === password.value) {
      isPassword = true;
    }
    setPassword2({ vlaue: e.target.value, check: isPassword });
  }

  /**
   * 전체 입력값이 제대로 입력되었는지 확인후, 회원가입을 진행
   */
  function signUpCheck() {
    //이메일 확인
    if (email.value !== "") {
      //이메일 형식 확인
      if (!email.value.match(emailReg)) {
        alert("이메일을 알맞게 작성해주세요.");
        return;
      }
    }
    if (email.value === "" || !email.check) {
      alert("이메일을 확인해주세요.");
      return;
    }
    //비번 확인
    if (password.value === "" || !password.check) {
      alert("비밀번호를 확인해주세요");
      return;
    }
    //2차비번 확인
    if (password2.value === "" || !password2.check) {
      alert("비밀번호를 확인해주세요");
      return;
    }
    //닉네임 확인
    if (nickName.value === "" || !nickName.check) {
      alert("닉네임이 중복입니다.");
      return;
    }

    //전화번호 숫자만 입력
    if (phone.value !== "" && !phone.value.match(isNumber)) {
      alert("전화번호는 숫자만 입력해주세요");
      return;
    }
    //회원가입 진행
    signup(
      {
        email: email.value,
        password: password.value,
        name: name.value,
        nickname: nickName.value,
        phoneNumber: phone.value,
      },
      () => {
        alert("회원가입 완료");
        navigate("/login");
      },
      () => {
        alert("잠시후 시도해 주세요");
      }
    );
  }
  return (
    <div>
      <StyledMainBody>
        <StyledRowCenter>
          <StyledHead className="page-header">정보 입력</StyledHead>
        </StyledRowCenter>
        <StyledRowCenter>
          <InputBox
            placehold="이메일"
            text="이미 존재하는 이메일 주소 입니다."
            isCheck={email.check}
            onChange={emailValue}
          />
          <InputBox
            placehold="비밀번호"
            text="8~16이내 !@#$%^&*만 써주세요"
            type="password"
            isCheck={password.check}
            onChange={passwordValue}
          />
          <InputBox
            placehold="비밀번호 확인"
            text="비밀번호를 확인해주세요"
            type="password"
            isCheck={password2.check}
            onChange={passwordValueCheck}
          />
          <InputBox
            placehold="닉네임"
            text="이미 존재하는 닉네임 입니다."
            isCheck={nickName.check}
            onChange={nickNameValue}
          />
          <BigInputBox placehold="이름" inputValue={nameValue} />
          <BigInputBox placehold="휴대폰 번호" inputValue={phoneValue} />
          <div></div>
          <div></div>
          <BigColorBtn name="가입하기" buttonClick={signUpCheck} />
        </StyledRowCenter>
      </StyledMainBody>
    </div>
  );
}
