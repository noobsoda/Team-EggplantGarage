import React from "react";
import styled from "styled-components";
import Tapbar from "../Organisms/Tapbar";

const StyledFlexBox = styled.div`
  display: flex;
`;

export default function FlexBox(props) {
  return (
    <StyledFlexBox>
      {props.children}
      <Tapbar />
    </StyledFlexBox>
  );
}
