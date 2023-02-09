import React from "react";
import styled from "styled-components";
import { Rating } from "@mui/material";
import ReviewTextBox from "../../Atoms/Text/ReviewTextBox";

const StyledReview = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow: hidden;
  row-gap: 24px;
  align-items: center;
`;

export default function ReviewReceived(review, otherName) {
  return (
    <StyledReview>
      <div className="page-header">{otherName}가 남긴 후기</div>
      <Rating readOnly size="large" value={review && review.score} />
      <ReviewTextBox conten={review && review.content}></ReviewTextBox>
    </StyledReview>
  );
}
