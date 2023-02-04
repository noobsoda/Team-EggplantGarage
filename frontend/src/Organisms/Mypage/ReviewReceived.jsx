import React from "react";
import styled from "styled-components";
import ItemCard from "../../Molecules/Cards/ItemCard";
import TextInput from "../../Atoms/Inputs/TextInput";
import { Rating } from "@mui/material";

const StyledReview = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow: hidden;
  row-gap: 24px;
  align-items: center;
`;

export default function ReviewReceived() {
  return (
    <StyledReview>
      <div className="page-header">상대방 누구가 남긴 후기</div>
      <ItemCard />
      <Rating readOnly size="large" value={5} />
      <TextInput onChange="그냥 내용 어쩌구 리뷰내용" />
    </StyledReview>
  );
}
