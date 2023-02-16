import React from "react";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import Body from "../../Templates/Layout/Body";
import { useState, useEffect } from "react";
import ReviewSent from "../../Organisms/Mypage/ReviewSent";
import ReviewReceived from "../../Organisms/Mypage/ReviewReceived";
import { useLocation } from "react-router-dom";
import { getReviewMine, getReviewOther } from "../../util/api/reviewApi";

export default function Review() {
  const [myReviewId, setMyReviewId] = useState(0);
  const [otherReviewId, setOtherReviewId] = useState(0);
  const [myreview, setMyreview] = useState(true);
  const initLocation = useLocation();
  const [myReviewContent, setMyReviewContent] = useState(undefined);
  const [otherReviewContent, setOtherReviewContent] = useState(undefined);
  const [otherName, setOtherName] = useState(undefined);
  useEffect(() => {
    if (initLocation.state !== null) {
      setMyReviewId(initLocation.state.myReviewId);
      setOtherReviewId(initLocation.state.otherReviewId);
      setOtherName(initLocation.state.otherName);
    }

    getReviewMine(initLocation.state.myReviewId, ({ data }) => {
      setMyReviewContent(data);
    });
    if (initLocation.state.otherReviewId !== 0)
      getReviewOther(initLocation.state.otherReviewId, ({ data }) => {
        setOtherReviewContent(data);
      });
  }, []);
  return (
    <Page>
      <Header isName={true} headerName="리뷰보기" />
      <Body>
        {myreview ? (
          <ReviewSent
            review={myReviewContent}
            isReceived={otherReviewId !== 0}
            otherName={otherName}
            buttonClick={() => {
              setMyreview(false);
            }}
          />
        ) : (
          <ReviewReceived review={otherReviewContent} otherName={otherName} />
        )}
      </Body>
    </Page>
  );
}
