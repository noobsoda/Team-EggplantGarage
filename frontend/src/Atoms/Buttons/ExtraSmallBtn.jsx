import React from "react";
import styled, {css} from "styled-components";

const StyledExtraSmallButton = styled.button`
  width: 64px;
  height: 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.graypurple};
  color: ${({ theme }) => theme.color.white};

  ${(props) =>
    props.color === "white" &&
    css`
    background-color: ${({ theme }) => theme.color.lightgrey};
    color: ${({ theme }) => theme.color.darkgrey};
    `};
`;

export default function ExtraSmallButton({ name, buttonClick, color }) {
  return (
    <StyledExtraSmallButton className="body2-bold" onClick={buttonClick} color = {color}>
      {name}
    </StyledExtraSmallButton>
  );
}
