import React from "react";
import styled from "styled-components";
import CategoryNav from "../Molecules/CategoryNav";
import LiveshowItem from "./LiveshowItem";

const StyledMainBody = styled.div``;
const FlexDiv = styled.div`
  display: flex;
`;

export default function MainBody() {
  return (
    <StyledMainBody>
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
    </StyledMainBody>
  );
}
