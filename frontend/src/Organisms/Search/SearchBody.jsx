import React from "react";
import LiveshowItem from "../../Molecules/Cards/LiveshowItem";
import ContainerSearch from "../../Templates/Layout/ContainerSearch";

//카테고리, 검색어, 지역, 정렬 넣어서 뽑아내기
export default function SearchBody({ category, keyword, location, sort }) {
  return (
    <>
      <ContainerSearch>
        <LiveshowItem isSearch={true} />
        <LiveshowItem isSearch={true} />
        <LiveshowItem isSearch={true} />
        <LiveshowItem isSearch={true} />
        <LiveshowItem isSearch={true} />
        <LiveshowItem isSearch={true} />
        <LiveshowItem isSearch={true} />
      </ContainerSearch>
    </>
  );
}
