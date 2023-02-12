import React from "react";
import styled from "styled-components";

const StyledInput1 = styled.input`
  width: calc(100% - 8px);
  height: 40px;
  border: 2px solid ${({ theme }) => theme.color.darkgrey};
  border-radius: 8px;
  color: ${({ theme }) => theme.color.black};
  text-align: ${(props) => props.textalign};
`;

const StyledInput = styled.input`
  width: 100%;
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
  border-radius: 8px;
  box-sizing: border-box;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  border: 1px solid ${({ theme }) => theme.color.darkgrey};
  color: ${({ theme }) => theme.color.black};
  text-align: ${(props) => props.textalign};
`;

export default function BigInput({
  placehold,
  inputValue,
  type,
  value,
  textalign,
  disabled,
}) {
  return (
    <StyledInput
      type={type}
      className="body1-regular"
      onChange={inputValue}
      placeholder={placehold}
      value={value}
      disabled={disabled}
      textalign={textalign}
    ></StyledInput>
  );
}
