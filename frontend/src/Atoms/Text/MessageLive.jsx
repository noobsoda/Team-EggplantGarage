import React from "react";
import styled, { css } from "styled-components";

const Text = styled.span`
  /* color: ${(props) => props.color}; */
  font-size: 14px;
  ${(props) => {
    if (props.color === "purple") {
      return css`
        color: ${({ theme }) => theme.color.purple};
        font-weight: 500;
        text-shadow: 1px 1px 2px purple;
      `;
    }
    if (props.color === "green") {
      return css`
        color: ${({ theme }) => theme.color.green};
        text-shadow: 1px 1px 2px green;
        font-weight: 700;
      `;
    }
    if (props.color === "red") {
      return css`
        color: #f92c33;
        font-weight: 700;
        text-shadow: 1px 1px 2px red;
      `;
    }
  }}
`;

export default function MessageLive({ message }) {
  return (
    <div className="body2-regular">
      <Text color={message.color}>{message.content}</Text>
    </div>
  );
}
