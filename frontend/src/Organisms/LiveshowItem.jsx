import React from "react";
import styled from "styled-components";
import LiveshowCard from "../Molecules/Cards/LiveshowCard";

const StyledLiveshowItem = styled.div`
  width: 88px;
  height: 192px;
`;
/*
	live 내부에 thumbnail, viewercnt , seller_nickname,liveshow_title 등등 뽑혀야됨  
*/
export default function LiveshowItem({ liveshow, buttonClick }) {
  //useState , event
  return (
    <StyledLiveshowItem onClick={buttonClick}>
      <LiveshowCard />
      <div className="body2-regular">라이브쇼 제목</div>
      <div className="body2-regular">판매자명</div>
    </StyledLiveshowItem>
  );
}
