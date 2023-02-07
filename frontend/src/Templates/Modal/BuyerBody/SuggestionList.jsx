import React from "react";
import styled from "styled-components";
import BundleBox from "../../../Molecules/Cards/BundleBox";
import ItemCard from "../../../Molecules/Cards/ItemCard";

const StyledBody = styled.div`
  padding: 8px 40px 8px;
  width: 280px;
`;

export default function SuggestionList() {
  return (
    <>
      <BundleBox>
        <ItemCard isBundle={true} />
        <ItemCard isBundle={true} />
        <ItemCard isBundle={true} />
        <ItemCard isBundle={true} />
      </BundleBox>
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </>
  );
}
