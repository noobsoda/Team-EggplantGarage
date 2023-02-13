import React, { useEffect, useState } from "react";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import Body from "../../Templates/Layout/Body";
import TextInput from "../../Atoms/Inputs/TextInput";
import Rating from "@mui/material/Rating";
import BigBtn from "../../Atoms/Buttons/BigBtn";
import ItemCard from "../../Molecules/Cards/ItemCard";
import { useLocation, useNavigate } from "react-router-dom";
import { postReview } from "../../util/api/reviewApi";

export default function WriteReview() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(5);
  const [productId, setProductId] = useState(0);
  const [isSeller, setIsSeller] = useState(true);
  const [content, setContent] = useState("");
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
  }, []);
  const writeReview = () => {
    let review = {
      content: content,
      productId: productId,
      score: value,
      seller: isSeller,
      visible: true,
    };
    postReview(review, ({ data }) => {
      console.log(review);
      console.log(data); // 입력 성공인지 체크해보자
    });
    navigate("/mypage");
  };
  return (
    <Page>
      <Header isName={true} headerName="리뷰작성" />
      <Body>
        <div className="page-header">상대방</div>
        <Rating
          size="large"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <TextInput
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placehold={"리뷰를 작성해주세요 (140자 이하)"}
        />
        <BigBtn buttonClick={writeReview} name="작성완료" />
      </Body>
    </Page>
  );
}
