import React from "react";
import styled from "styled-components";

const StyledLiveshowCard = styled.div`
  width: 100%;
  height: 75%;
  // padding-top: 8px;
  // padding-left: 8px;
  border-radius: 8px;
  background: url(${(props) => props.imgSrc}) no-repeat 0px 0px;
  background-size: cover;
`;
const ViewerCntBox = styled.div`
  display: flex;
  width: 40px;
  height: 16px;
  border-radius: 8px;
  margin: 8px;
  background-color: black;
  color: ${({ theme }) => theme.color.white};
`;
const Image = styled.div`
  background: url("/image/viewer-icon.svg");
  width: 16px;
  height: 16px;
  border-radius: 8px;
  z-index: 1;
`;
const Text = styled.div`
  width: 24px;
  height: 16px;
  padding-left: 4px;
  color: ${({ theme }) => theme.color.white};
`;
export default function LiveshowCard({ imgSrc, viewerCnt, buttonClick }) {
  //썸네일 시청자수 등등... 일단은 백그라운드 그레이로 가자
  return (
    <StyledLiveshowCard
      onClick={buttonClick}
      imgSrc={imgSrc || "/image/liveshow.jpg"}
    >
      <ViewerCntBox>
        <Image />
        <Text className="body3-bold">{viewerCnt}</Text>
      </ViewerCntBox>
    </StyledLiveshowCard>
  );
}
