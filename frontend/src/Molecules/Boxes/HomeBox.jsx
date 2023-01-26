import React from "react";
import styled from "styled-components";
import HomeIcon from "../../Atoms/TapBarIcons/HomeIcon";

const StyledHomeBox = styled.button`
  width: 72px;
  height: 56px;
`;

export default function HomeBox({ buttonClick }) {
  return (
    <StyledHomeBox>
      <HomeIcon />
      <div className="tapbar">홈</div>
    </StyledHomeBox>
  );
}
