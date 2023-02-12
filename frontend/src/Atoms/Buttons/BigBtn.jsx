import React, { Fragment } from "react";
import styled from "styled-components";

const StyledBigBtn1 = styled.button`
  width: calc(100%);
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.white};
`;

const StyledDefaultBtn = styled.button`
  display: block;
  border-radius: 12px;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
  background-size: 200%;
  // font-size: 1.2rem;
  // font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  //margin: 1rem 0;
  cursor: pointer;
  transition: 0.5s;
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.white};
`;

const StyledWhiteBtn = styled.button`
  display: block;
  border-radius: 12px;
  outline: none;
  border: none;
  background-size: 200%;
  // font-size: 1.2rem;
  // font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  //margin: 1rem 0;
  cursor: pointer;
  transition: 0.5s;
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.color.lightgrey};
  color: ${({ theme }) => theme.color.darkgrey};
`;

export default function BigBtn({ name, buttonClick, color }) {
  return (
    <Fragment>
      {color === undefined && (
        <StyledDefaultBtn className="body1-header" onClick={buttonClick}>
          {name}
        </StyledDefaultBtn>
      )}
      {color === "gray" && (
        <StyledWhiteBtn className="body1-header" onClick={buttonClick}>
          {name}
        </StyledWhiteBtn>
      )}
    </Fragment>
  );
}
