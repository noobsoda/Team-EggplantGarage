import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 280px;
  height: 40px;

  border: 2px solid ${({ theme }) => theme.color.darkgrey};
  border-radius: 8px;

  color: ${({ theme }) => theme.color.black};
`;

export default function InputBox({ placehold, inputValue }) {
  return <Input className="body1-regular" onChange={inputValue} placeholder={placehold}></Input>;
}
