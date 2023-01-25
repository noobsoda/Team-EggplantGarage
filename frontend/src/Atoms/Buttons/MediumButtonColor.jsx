import React from "react";
import styled from "styled-components";

const BigButton = styled.button`
  width: 280px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.red};
  color: ${({ theme }) => theme.color.white};
`;

export default function BigButtonColor({ name, buttonClick }) {
  return (
    <BigButton className="body1-header" onClick={buttonClick}>
      {name}
    </BigButton>
  );
}
