import React from "react";
import styled from "styled-components";

const StyledViewerCntBox = styled.div`
  display: flex;
  width: 64px;
  height: 24px;
  border-radius: 16px;
  padding: 4px;
  background-color: rgb(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.color.white};
  column-gap: 4px;
  align-items: center;
`;
const Image = styled.div`
  background: url("/image/liveshow/people-icon.svg");
  background-size: cover;
  width: 24px;
  height: 24px;
`;
const Text = styled.div`
  width: 28px;
  color: ${({ theme }) => theme.color.white};
  text-align: right;
`;

export default function ViewerCntBox({ viewerCnt }) {
  return (
    <StyledViewerCntBox>
      <Image />
      <Text className="body1-header">
        {viewerCnt !== undefined ? viewerCnt : 14}
      </Text>
    </StyledViewerCntBox>
  );
}
