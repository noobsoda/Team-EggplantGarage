import React from "react";
import styled from "styled-components";
import LiveshowCard from "../Molecules/Cards/LiveshowCard";
import { useNavigate } from "react-router-dom";

const StyledLiveshowItem = styled.div`
  width: 88px;
  height: 192px;
`;
/*
	live 내부에 thumbnail, viewercnt , seller_nickname,liveshow_title 등등 뽑혀야됨  
*/
export default function LiveshowItem({ liveshow }) {
  //useState , event
  const navigate = useNavigate();
  return (
    <StyledLiveshowItem onClick={() => navigate("/liveshowdetail")}>
      <LiveshowCard />
      <div className="body2-regular">라이브쇼 제목</div>
      <div className="body2-regular">판매자명</div>
    </StyledLiveshowItem>
  );
}
