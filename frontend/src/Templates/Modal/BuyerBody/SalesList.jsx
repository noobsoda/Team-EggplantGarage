import React from "react";
import styled from "styled-components";
import ItemCard from "../../../Molecules/Cards/ItemCard";

const StyledBody = styled.div`
  padding: 8px 40px 8px;
  width: 280px;
`;

export default function SalesList({ setModalOpen }) {
  return (
    <>
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </>
  );
}
