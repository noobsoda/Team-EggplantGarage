import React from "react";
import styled from "styled-components";

const ExtraSmallButton = styled.button`
  width: 64px;
  height: 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.white};
`;

export default function ExtraSmallButtonColor({ name, buttonClick }) {
  return (
    <ExtraSmallButton className="body2-bold" onClick={buttonClick}>
      {name}
    </ExtraSmallButton>
  );
}
