import React from "react";
import styled from "styled-components";
import ItemCard from "../../../Molecules/Cards/ItemCard";
import BigBtn from "../../../Atoms/Buttons/BigBtn";
import BigInput from "../../../Atoms/Inputs/BigInput";

const InfoBox = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  align-items: center;
`;

export default function SalesList({}) {
  return (
    <>
      <ItemCard buttonType={"check"} />
      <ItemCard buttonType={"check"} />
      <ItemCard buttonType={"check"} />
      <ItemCard buttonType={"check"} />
      <ItemCard buttonType={"check"} />
      <ItemCard buttonType={"check"} />
      <ItemCard buttonType={"check"} />
      <InfoBox>
        <BigInput placehold={"예상금액"} textalign="right" />
        <BigBtn name={"구매요청"} />
      </InfoBox>
    </>
  );
}
