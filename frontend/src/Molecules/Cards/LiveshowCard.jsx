import React from "react";
import styled from "styled-components";

const StyledLiveshowCard = styled.div`
  width: 88px;
  height: 160px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.grey};
`;

export default function LiveshowCard({ viewerCnt, buttonClick }) {
  //썸네일 시청자수 등등... 일단은 백그라운드 그레이로 가자
  return <StyledLiveshowCard onClick={buttonClick}></StyledLiveshowCard>;
}
