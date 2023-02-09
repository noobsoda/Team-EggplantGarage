import React from "react";
import styled from "styled-components";

const StyledReviewTextBox = styled.div`
  width: calc(100% - 8px);
  height: 80px;

  border: 2px solid ${({ theme }) => theme.color.darkgrey};
  border-radius: 8px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.color.black};
`;

export default function ReviewTextBox({ content }) {
  return <StyledReviewTextBox>{content}</StyledReviewTextBox>;
}
