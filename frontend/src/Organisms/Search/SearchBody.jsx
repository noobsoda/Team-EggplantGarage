import React from "react";
import styled from "styled-components";
import Body from "../Atoms/Body";
import LiveshowItem from "../../Molecules/Cards/LiveshowItem";

const FlexDiv = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
//카테고리, 검색어, 지역, 정렬 넣어서 뽑아내기
export default function SearchBody({ category, keyword, location, sort }) {
  return (
    <Body>
      <FlexDiv>
        <LiveshowItem />
        <LiveshowItem />
        <LiveshowItem />
        <LiveshowItem />
        <LiveshowItem />
        <LiveshowItem />
        <LiveshowItem />
        <LiveshowItem />
        <LiveshowItem />
      </FlexDiv>
    </Body>
  );
}
