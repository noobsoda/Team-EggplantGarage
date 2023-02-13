import React, { Fragment } from "react";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import Body from "../../Templates/Layout/Body";
import styled, { css } from "styled-components";
import PurchasedHistory from "../../Organisms/Mypage/PurchasedHistory";
import { useState } from "react";
import SalesHistory from "../../Organisms/Mypage/SalesHistory";
import { useNavigate } from "react-router-dom";
import ExtraSmallBtn from "../../Atoms/Buttons/ExtraSmallBtn";
//redux
import { logoutAction } from "../../store/user";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Info = styled.div`
  height: 64px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: 100%;
  justify-content: center;
  margin: 20px 0px 12px 0px;
`;
const InfoFlex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 24px;
`;
const SelectBar = styled.div`
  margin-top: 12px;
  height: 40px;
  width: 100%;
  display: flex;
  border-radius: 4px;
  justify-content: space-around;
  align-items: center;
  border-bottom: solid;
  border-bottom-color: ${({ theme }) => theme.color.lightgrey};
  border-top: solid;
  border-top-color: ${({ theme }) => theme.color.lightgrey};  
`;

const StyledBtn = styled.button`
  height: 80%;
  width: 50%;
  color: ${({ theme }) => theme.color.lightgrey};
  ${(props) =>
    props.selected &&
    css`
      color: black;
    `};
`;

export default function Mypage() {
  const [isPurchase, setisPurchase] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  function goInfoEdit() {
    navigate("/infoedit");
  }

  function logoutClick() {
    dispatch(logoutAction(navigate));
  }
  return (
    <Page>
      <Header isName={true} headerName="마이페이지" />
      <Body>
        <Info>
          <InfoFlex>
            <div className="page-header">{user.nickname}</div>
            <ExtraSmallBtn
              name="로그아웃"
              buttonClick={logoutClick}
            ></ExtraSmallBtn>
          </InfoFlex>
          <InfoFlex>
            <div>　</div>
            <ExtraSmallBtn
              name="회원정보"
              buttonClick={goInfoEdit}
            ></ExtraSmallBtn>
          </InfoFlex>
        </Info>

        <SelectBar>
          <StyledBtn
            className="body1-header"
            onClick={() => setisPurchase(true)}
            selected={isPurchase}
          >
            구매내역
          </StyledBtn>
          <StyledBtn
            className="body1-header"
            onClick={() => setisPurchase(false)}
            selected={!isPurchase}
          >
            판매내역
          </StyledBtn>
        </SelectBar>
        {/* 이부분 따로 컴포넌트화 시켜서 빼서 켜고 닫히게 해야함 */}
        {isPurchase === true ? <PurchasedHistory /> : <SalesHistory />}
      </Body>
    </Page>
  );
}
