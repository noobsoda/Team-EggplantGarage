import React from "react";
import styled from "styled-components";
import Tapbar from "./Tapbar";

const StyledPage = styled.div`
  width: 360px;
  height: 100%;
`;

export default function Page(props) {
  return (
    <StyledPage>
      {props.children}
      <Tapbar />
    </StyledPage>
  );
}
