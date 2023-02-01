import React from "react";
import styled from "styled-components";
import CategoryNav from "../Molecules/CategoryNav";
import LiveshowItem from "./LiveshowItem";
import Body from "../Atoms/Body";

const FlexDiv = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-between;
`;

export default function MainBody() {
  return (
    <Body>
      <div className="page-header">지역 Liveshow</div>
      <FlexDiv>
        <LiveshowItem />
        <LiveshowItem />
        <LiveshowItem />
      </FlexDiv>
      <div className="page-header">전국 Liveshow</div>
      <CategoryNav />
      <FlexDiv>
        <LiveshowItem />
        <LiveshowItem />
        <LiveshowItem />
      </FlexDiv>
    </Body>
  );
}
