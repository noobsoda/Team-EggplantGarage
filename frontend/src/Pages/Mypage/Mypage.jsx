import React from "react";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import Body from "../../Templates/Layout/Body";
import styled from "styled-components";
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
`;
const InfoFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 24px;
`;
const InfoEditBtn = styled.button`
  width: 24px;
  height: 24px;
  background: url("/image/edit.svg") no-repeat 0px 0px;
`;
const SelectBar = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-bottom: solid;
  border-bottom-color: ${({ theme }) => theme.color.lightgrey};
  border-top: solid;
  border-top-color: ${({ theme }) => theme.color.lightgrey};
`;
const SimpleFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
`;
export default function Mypage() {
  const [isPurchase, setisPurchase] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  // console.log(user);
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
            <SimpleFlex>
              <img src="/image/star.svg" alt="" />
              <div className="body1-header">5.0</div>
            </SimpleFlex>
            <SimpleFlex>
              <div className="body1-header" style={{ height: "24px" }}>
                회원정보수정
              </div>
              <InfoEditBtn onClick={goInfoEdit}></InfoEditBtn>
            </SimpleFlex>
          </InfoFlex>
        </Info>
        <SelectBar>
          <button className="body1-header" onClick={() => setisPurchase(true)}>
            구매내역
          </button>
          <button className="body1-header" onClick={() => setisPurchase(false)}>
            판매내역
          </button>
        </SelectBar>
        {/* 이부분 따로 컴포넌트화 시켜서 빼서 켜고 닫히게 해야함 */}
        {isPurchase === true ? <PurchasedHistory /> : <SalesHistory />}
      </Body>
    </Page>
  );
}
