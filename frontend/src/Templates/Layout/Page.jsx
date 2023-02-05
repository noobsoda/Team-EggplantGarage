import React from "react";
import styled from "styled-components";
import Tapbar from "./Tapbar";

const StyledPage = styled.div`
  position: relative;
  width: 360px;
  height: 640px;
`;

export default function Page(props) {
  return (
    <StyledPage>
      {props.children}
      <Tapbar />
    </StyledPage>
  );
}
