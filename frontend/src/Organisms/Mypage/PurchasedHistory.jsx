import React from "react";
import styled from "styled-components";
import ItemCard from "../../Molecules/Cards/ItemCard";

const StyledPurchasedHistory = styled.div``;

export default function PurchasedHistory() {
  return (
    <StyledPurchasedHistory>
      <ItemCard buttonType={"purchasedhistory"} isReview={true} />
      <ItemCard buttonType={"purchasedhistory"} isReview={true} />
      <ItemCard buttonType={"purchasedhistory"} isReview={false} />
      <ItemCard buttonType={"purchasedhistory"} isReview={false} />
    </StyledPurchasedHistory>
  );
}
