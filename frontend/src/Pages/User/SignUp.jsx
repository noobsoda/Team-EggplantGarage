import React from "react";
import { useNavigate } from "react-router-dom";
import BigBtn from "../../Atoms/Buttons/BigBtn";
import Header from "../../Templates/Layout/Header";
import Body from "../../Templates/Layout/Body";
import Page from "../../Templates/Layout/Page";
import styled from "styled-components";

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Center = styled(Body)`
  width: calc(80%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

const StyledRowCenter = styled.div`
  display: block;
  width: calc(80%);
  justify-content: center;
  margin: 0 auto;
`;

export default function SignUp() {
  const navigate = useNavigate();
  function goToEmail() {
    navigate("/signupemail");
  }
  return (
    <Page>
      <Header headerName="회원가입" isName={true} />
      <Center>
        <StyledRowCenter>
          <ButtonBox>
            <BigBtn name="이메일로 가입하기" buttonClick={goToEmail}></BigBtn>
          </ButtonBox>
        </StyledRowCenter>
      </Center>
    </Page>
  );
}
