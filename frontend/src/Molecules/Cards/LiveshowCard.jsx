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
  width: 64px;
  height: 24px;
  border-radius: 12px;
  margin: 8px;
  background-color: black;
  color: ${({ theme }) => theme.color.white};
  column-gap: 4px;
  align-items: center;
`;
const Image = styled.div`
  background: url("/image/viewer-icon.svg");
  background-size: cover;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  z-index: 1;
`;
const Text = styled.div`
  width: 28px;
  color: ${({ theme }) => theme.color.white};
  text-align: right;
`;
export default function LiveshowCard({ imgSrc, viewerCnt, buttonClick, isHistory }) {
  //썸네일 시청자수 등등... 일단은 백그라운드 그레이로 가자
  console.log(imgSrc);
  return (
    <StyledLiveshowCard onClick={buttonClick} imgSrc={imgSrc || "/image/liveshow.jpg"}>
      {isHistory ? (
        <></>
      ) : (
        <ViewerCntBox>
          <Image />
          <Text className="body2-bold">{viewerCnt !== undefined ? viewerCnt : 14}</Text>
        </ViewerCntBox>
      )}
    </StyledLiveshowCard>
  );
}
