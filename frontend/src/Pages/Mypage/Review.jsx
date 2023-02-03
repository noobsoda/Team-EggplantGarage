import React from "react";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import Body from "../../Templates/Layout/Body";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReviewSent from "../../Organisms/Mypage/ReviewSent";
import ReviewReceived from "../../Organisms/Mypage/ReviewReceived";

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
