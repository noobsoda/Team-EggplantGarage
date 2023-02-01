import React from "react";
import styled from "styled-components";
import ItemCard from "../Molecules/Cards/ItemCard";

const StyledPurchasedHistory = styled.div`
  width: 280px;
`;

export default function PurchasedHistory() {
  return (
    <StyledPurchasedHistory>
      <ItemCard buttonType={"purchasedhistory"} />
      <ItemCard buttonType={"check"} />
      <ItemCard buttonType={"one"} />
      <ItemCard buttonType={"purchasedhistory"} />
    </StyledPurchasedHistory>
  );
}
