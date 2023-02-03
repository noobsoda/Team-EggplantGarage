import React from "react";
import styled from "styled-components";
import Tapbar from "../Templates/Tapbar";

const StyledFlexBox = styled.div`
  display: flex;
`;

export default function FlexBox(props) {
  return <StyledFlexBox>{props.children}</StyledFlexBox>;
}
