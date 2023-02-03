import React, { useEffect } from "react";
import styled from "styled-components";
import LiveshowCard from "./LiveshowCard";
import { useNavigate } from "react-router-dom";

const StyledLiveshowItem = styled.div`
  width: 88px;
  height: 192px;
`;
/*
	live 내부에 thumbnail, viewercnt , seller_nickname,liveshow_title 등등 뽑혀야됨  
*/
export default function LiveshowItem({ isViewer, show = {} }) {
  //useState , event
  const navigate = useNavigate();
  function goTo() {
    if (isViewer) {
      navigate("/liveshowbuyer");
    } else {
      navigate("liveshowdetail");
    }
  }
  return (
    <StyledLiveshowItem onClick={goTo}>
      <LiveshowCard viewerCnt={show.joinUsersNum} imgSrc={show.thumbnailUrl} />
      {show && <div className="body2-regular">{show.title}</div>}
      {show && <div className="body2-regular">{show.owner}</div>}
    </StyledLiveshowItem>
  );
}
