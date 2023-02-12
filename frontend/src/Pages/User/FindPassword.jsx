import React from "react";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import Body from "../../Templates/Layout/Body";
import styled from "styled-components";
import BigInput from "../../Atoms/Inputs/BigInput";
import MidInput from "../../Atoms/Inputs/MidInput";
import SmallBtn from "../../Atoms/Buttons/SmallBtn";

const StyledGreenBox = styled.div`
  color: ${({ theme }) => theme.color.green};
  padding-bottom: 56px;
`;
const EmailFlexBox = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;
`;

export default function FindPassword() {
  return (
    <Page>
      <Header isName={true} headerName="비밀번호 찾기" />
      <Body>
        <StyledGreenBox className="body2-bold">
          이메일로 변경된 비밀번호를 전송합니다. <br /> 이름, 전화번호, 가입한
          이메일을 입력해주세요. <br /> 로그인후 비밀번호를 변경하세요.
        </StyledGreenBox>
        <BigInput placehold={"이름"} />
        <BigInput placehold={"전화번호"} />
        <EmailFlexBox>
          <MidInput placehold={"이메일"} />
          <SmallBtn name="전송" />
        </EmailFlexBox>
      </Body>
    </Page>
  );
}
