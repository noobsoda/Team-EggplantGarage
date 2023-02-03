import React from "react";
import styled from "styled-components";
import LiveshowItem from "../../Molecules/Cards/LiveshowItem";

const Container = styled.div`
  width: 280px;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  row-gap: 8px;
  column-gap: 8px;
`;
//카테고리, 검색어, 지역, 정렬 넣어서 뽑아내기
export default function SearchBody({ category, keyword, location, sort }) {
  return (
    <>
      <Container>
        <LiveshowItem />
        <LiveshowItem />
        <LiveshowItem />
        <LiveshowItem />
        <LiveshowItem />
        <LiveshowItem />
        <LiveshowItem />
        <LiveshowItem />
        <LiveshowItem />
        <LiveshowItem />
      </Container>
    </>
  );
}
