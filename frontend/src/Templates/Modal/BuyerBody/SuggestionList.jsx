import React from "react";
import styled from "styled-components";
import BundleBox from "../../../Molecules/Cards/BundleBox";
import ItemCard from "../../../Molecules/Cards/ItemCard";

export default function SuggestionList({ isSeller, suggestList }) {
  return (
    <>
      {suggestList.map((items, i) => {
        return (
          <BundleBox key={i} isSeller={isSeller}>
            {items.map((item) => {
              return (
                <ItemCard item={item} isBundle={true} isSeller={isSeller} />
              );
            })}
          </BundleBox>
        );
      })}
    </>
  );
}
