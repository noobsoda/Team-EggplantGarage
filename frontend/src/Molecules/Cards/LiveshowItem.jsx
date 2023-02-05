import React, { useEffect } from "react";
import styled from "styled-components";
import LiveshowCard from "./LiveshowCard";
import { useNavigate } from "react-router-dom";

const StyledLiveshowItem = styled.div`
  width: calc(50% - 4px);
  height: ${(props) => {
    return props.isSearch ? "calc(30% - 16px)" : "100%";
  }};
  flex-grow: 0;
  flex-shrink: 0;
  // box-sizing: content-box;
  display: flex;
  flex-direction: column;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;
/*
	live 내부에 thumbnail, viewercnt , seller_nickname,liveshow_title 등등 뽑혀야됨  
*/
export default function LiveshowItem({
  isSearch,
  isViewer,
  show = {},
  isHistory,
}) {
  //useState , event
  const navigate = useNavigate();
  function goTo() {
    if (isViewer) {
      navigate("/liveshowbuyer");
    } else {
      navigate("/liveshowdetail");
    }
  }
  return (
    <StyledLiveshowItem isSearch={isSearch} onClick={goTo}>
      <LiveshowCard viewerCnt={show.joinUsersNum} imgSrc={show.thumbnailUrl} />
      <InfoBox>
        {show && (
          <div className="body1-header">{show.title || "라이브방 제목"}</div>
        )}
        {show && (
          <div className="body1-regular">
            {isHistory
              ? show.created_at || "판매날짜"
              : show.owner || "판매자명"}
          </div>
        )}
      </InfoBox>
    </StyledLiveshowItem>
  );
}
