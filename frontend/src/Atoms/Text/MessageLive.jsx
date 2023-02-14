import React from "react";
import styled from "styled-components";

const Text = styled.span`
  color: ${(props) => props.color};
`;

export default function MessageLive({ message }) {
  return (
    <div className="body2-regular">
      <Text color={message.color}>{message.content}</Text>
    </div>
  );
}
