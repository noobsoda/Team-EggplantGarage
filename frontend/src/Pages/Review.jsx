import React from "react";
import Header from "../Organisms/Header";
import Page from "../Atoms/Page";
import Body from "../Atoms/Body";
import Rating from "@mui/material/Rating";
import TextInput from "../Atoms/Inputs/TextInput";
import BigBtn from "../Atoms/Buttons/BigBtn";
import ItemCard from "../Molecules/Cards/ItemCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReviewSent from "../Organisms/ReviewSent";
import ReviewReceived from "../Organisms/ReviewReceived";

export default function Review() {
  const [value, setValue] = useState(5);
  const navigate = useNavigate();
  const [myreview, setMyreview] = useState(true);
  return (
    <Page>
      <Header isName="True" headerName="리뷰보기" />
      <Body>
        {myreview ? (
          <ReviewSent
            buttonClick={() => {
              setMyreview(false);
            }}
          />
        ) : (
          <ReviewReceived />
        )}
      </Body>
    </Page>
  );
}
