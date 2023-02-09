import React, { useEffect, useState } from "react";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import Body from "../../Templates/Layout/Body";
import TextInput from "../../Atoms/Inputs/TextInput";
import Rating from "@mui/material/Rating";
import BigBtn from "../../Atoms/Buttons/BigBtn";
import ItemCard from "../../Molecules/Cards/ItemCard";
import { useLocation } from "react-router-dom";
import { postReview } from "../../util/api/reviewApi";

export default function WriteReview() {
  const [value, setValue] = React.useState(5);
  const [productId, setProductId] = useState(undefined);
  const [isSeller, setIsSeller] = useState(undefined);
  const [content, setContent] = useState(undefined);
  //   const [txt, setTxt] = React.useState("");
  //value에 레이팅이 기록된다.
  //mui 사용해서 install 해야함..
  //npm install @mui/material @emotion/react @emotion/styled
  const initLocation = useLocation();
  useEffect(() => {
    if (initLocation.state !== null) {
      setProductId(initLocation.state.productId);
      setIsSeller(initLocation.state.isSeller);
    }
    let review = {
      content: "리뷰 내용입니다.",
      productId: productId,
      score: value,
      seller: isSeller,
      visible: true,
    };
    postReview(review, ({ data }) => {
      console.log(review);
      console.log(data); // 입력 성공인지 체크해보자
    });
  }, [value, isSeller, productId]);

  return (
    <Page>
      <Header isName={true} headerName="리뷰작성" />
      <Body>
        <div className="page-header">상대방</div>
        <ItemCard />
        <Rating
          size="large"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <TextInput
          onChange={(event, value) => {
            setContent(value);
          }}
          placehold={"리뷰를 작성해주세요 (140자 이하)"}
        />
        <BigBtn name="작성완료" />
      </Body>
    </Page>
  );
}
