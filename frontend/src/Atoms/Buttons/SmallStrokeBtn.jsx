import React, { Fragment } from "react";
import styled from "styled-components";

const StyledBtn = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.graypurple};
  color: ${({ theme }) => theme.color.white};
`;

export default function SmallStrokeBtn({ name, buttonClick, color }) {
  return (
    <Fragment>
      {color === undefined && (
        <StyledBtn className="body1-header" onClick={buttonClick}>
          {name}
        </StyledBtn>
      )}
    </Fragment>
  );
}
