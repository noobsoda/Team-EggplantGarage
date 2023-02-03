import React from "react";
import Header from "../../Templates/Layout/Header";
import Body from "../../Templates/Layout/Body";
import Page from "../../Templates/Layout/Page";
import styled from "styled-components";
import LiveshowItem from "../../Molecules/Cards/LiveshowItem";
import LiveStartBtn from "../../Atoms/IconButtons/LiveStartBtn";
import CategoryNav from "../../Molecules/Category/CategoryNav";
import { useNavigate } from "react-router-dom";

const FlexDiv = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-between;
`;

export default function Main() {
  const navigate = useNavigate();
  function startLive() {
    navigate("/liveshowsubmit");
  }
  return (
    <Page>
      {/* 헤더 */}
      <Header isLogo="True" />
      <Body>
        <div className="page-header" style={{ marginBottom: "8px" }}>
          지역 Liveshow
        </div>
        <FlexDiv>
          <LiveshowItem isViewer={true} />
          <LiveshowItem isViewer={true} />
          <LiveshowItem isViewer={true} />
        </FlexDiv>
        <div className="page-header" style={{ marginBottom: "8px" }}>
          전국 Liveshow
        </div>
        <CategoryNav />
        <FlexDiv>
          <LiveshowItem isViewer={true} />
          <LiveshowItem isViewer={true} />
          <LiveshowItem isViewer={true} />
        </FlexDiv>
        <LiveStartBtn buttonClick={startLive} />
      </Body>
    </Page>
  );
}
