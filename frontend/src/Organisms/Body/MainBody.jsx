import React from "react";
import styled from "styled-components";
import CategoryNav from "../../Molecules/Category/CategoryNav";
import LiveshowItem from "../../Molecules/Cards/LiveshowItem";
import Body from "../../Templates/Layout/Body";
import LiveStartBtn from "../../Atoms/IconButtons/LiveStartBtn";
import { useNavigate } from "react-router-dom";

const FlexDiv = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-between;
`;

export default function MainBody() {
  const navigate = useNavigate();
  function startLive() {
    navigate("/liveshowsubmit");
  }
  return (
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
  );
}
