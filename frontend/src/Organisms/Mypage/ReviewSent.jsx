import React from "react";
import styled from "styled-components";
import ReviewTextBox from "../../Atoms/Text/ReviewTextBox";
import { Rating } from "@mui/material";
import BigBtn from "../../Atoms/Buttons/BigBtn";

const StyledReview = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow: hidden;
  row-gap: 24px;
  align-items: center;
`;

export default function ReviewSent({ buttonClick, review, otherName }) {
  return (
    <StyledReview>
      <div className="page-header">{otherName}에게 남긴 후기</div>
      <Rating readOnly size="large" value={review && review.score} />
      <ReviewTextBox conten={review && review.content}></ReviewTextBox>
      <BigBtn name="받은후기 보기" buttonClick={buttonClick} />
    </StyledReview>
  );
}
