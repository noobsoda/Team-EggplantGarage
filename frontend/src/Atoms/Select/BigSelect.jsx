import React from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  width: 280px;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.color.darkgrey};
  border-radius: 8px;
  color: ${({ theme }) => theme.color.darkgrey};
`;

export default function BigSelect({ options, onChange }) {
  return (
    <StyledSelect className="body1-regular" onChange={onChange}>
      <option value="">선택</option>
      {options.map((ele) => {
        return (
          <option key={ele} value={ele}>
            {ele}
          </option>
        );
      })}
    </StyledSelect>
  );
}
