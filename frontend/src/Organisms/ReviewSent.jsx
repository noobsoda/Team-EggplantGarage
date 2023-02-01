import React from "react";
import styled from "styled-components";
import ItemCard from "../Molecules/Cards/ItemCard";
import TextInput from "../Atoms/Inputs/TextInput";
import { Rating } from "@mui/material";
import BigBtn from "../Atoms/Buttons/BigBtn";

const StyledReview = styled.div`
  width: 280px;
`;

export default function ReviewSent({ buttonClick }) {
  return (
    <StyledReview>
      <div className="page-header">상대방 누구에게 남긴 후기</div>
      <ItemCard />
      <Rating name="read-only" size="large" value={5} />
      <TextInput onChange="그냥 내용 어쩌구 리뷰내용" />
      <BigBtn name="받은후기 보기" buttonClick={buttonClick} />
    </StyledReview>
  );
}
