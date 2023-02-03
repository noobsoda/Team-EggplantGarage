import React from "react";
import Header from "../Organisms/Header";
import Page from "../Templates/Page";
import Body from "../Atoms/Body";
import styled from "styled-components";
import PurchasedHistory from "../../Organisms/Mypage/PurchasedHistory";
import { useState } from "react";
import SalesHistory from "../Organisms/SalesHistory";
import { useNavigate } from "react-router-dom";

const Info = styled.div`
  width: 280px;
  height: 64px;
  border-bottom: solid;
  border-bottom-color: ${({ theme }) => theme.color.lightgrey};
`;
const InfoFlex = styled.div`
  display: flex;
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
  width: 280px;
  display: flex;
  justify-content: space-around;
  border-bottom: solid;
  border-bottom-color: ${({ theme }) => theme.color.lightgrey};
`;

export default function Mypage() {
  const [isPurchase, setisPurchase] = useState(true);
  const navigate = useNavigate();
  function goInfoEdit() {
    navigate("/infoedit");
  }
  return (
    <Page>
      <Header isName="True" headerName="마이페이지" />
      <Body>
        <Info>
          <InfoFlex>
            <div className="page-header">닉네임</div>
            <div>
              <span className="body1-regular" style={{ height: "24px" }}>
                회원정보수정
              </span>
              <InfoEditBtn onClick={goInfoEdit}></InfoEditBtn>
            </div>
          </InfoFlex>
          <img src="/image/star.svg" alt="" />
          <span className="body1-regular">5.0</span>
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
