import React from "react";
import styled from "styled-components";

export default function MessageLive({ message }) {
  return (
    <p className="body2-regular">
      {message.sender && <span>{message.sender}</span>}
      {message.content && <span>{message.content}</span>}
    </p>
  );
}
