import React from "react";
import styled from "styled-components";

const StyledInputTemp = styled.input`
  width: calc(100% - 95.2px);
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.darkgrey};
  color: ${({ theme }) => theme.color.black};
  text-align: ${(props) => props.textalign};
`;

const StyledInput = styled.input`
  width: calc(100% - 95.2px);
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.lightgrey};
  color: ${({ theme }) => theme.color.black};
  text-align: ${(props) => props.textalign};
`;

export default function MidInput({ placehold, inputValue }) {
  return (
    <StyledInput
      className="body1-regular"
      onChange={inputValue}
      placeholder={placehold}
    ></StyledInput>
  );
}
