import React from "react";
import styled from "styled-components";

const StyledPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Gif = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background: url("/image/shakingGazi.gif") no-repeat -10% 0px;
  background-size: contain;
  color: ${({ theme }) => theme.color.black};
  font-weight: 500;
  row-gap: 16px;
`;
const Text = styled.div`
  font-size: larger;
  color: #fff;
  text-shadow: 0 0 3px #fff, 0 0 5px #fff, 0 0 10px #fff, 0 0 21px #ee00ff,
    0 0 42px #ee00ff, 0 0 46px #ee00ff, 0 0 51px #ee00ff, 0 0 69px #ee00ff;
`;
const Text2 = styled.div`
  font-size: larger;
  color: #fff;
  font-weight: 700;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 60px #00ffbf,
    0 0 82px #00ffbf, 0 0 92px #00ffbf, 0 0 102px #00ffbf, 0 0 151px #00ffbf;
`;

export default function NotFound() {
  return (
    <StyledPage>
      <Gif className="page-header">
        <div style={{ height: "30vh" }}>　</div>
        <Text2>치지직.....</Text2>
        <Text>페이지가 없습니다</Text>
      </Gif>
    </StyledPage>
  );
}
