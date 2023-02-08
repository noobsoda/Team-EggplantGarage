import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledTapbarBox = styled.button`
  width: 72px;
  height: 56px;
  z-index: 1;
  background-color: white;
`;
const StyledIcon = styled.div`
  width: 24px;
  height: 24px;
  margin: 0 auto;
  background: url(${(props) => props.imgSrc}) no-repeat 0px 0px;
  background-position-y: -${(props) => props.isClicked && 24}px;
`;
export default function TapbarBox({ name, imgSrc, clicked, category }) {
  const page = useSelector((state) => state.tapbar.page);
  return (
    <StyledTapbarBox onClick={clicked}>
      <StyledIcon imgSrc={imgSrc} isClicked={page === category} />
      <div className="tapbar">{name}</div>
    </StyledTapbarBox>
  );
}
