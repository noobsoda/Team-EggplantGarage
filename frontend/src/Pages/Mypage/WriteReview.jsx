import React from "react";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import Body from "../../Templates/Layout/Body";
import TextInput from "../../Atoms/Inputs/TextInput";
import Rating from "@mui/material/Rating";
import BigBtn from "../../Atoms/Buttons/BigBtn";
import ItemCard from "../../Molecules/Cards/ItemCard";

export default function WriteReview() {
  const [value, setValue] = React.useState(5);
  //   const [txt, setTxt] = React.useState("");
  //value에 레이팅이 기록된다.
  //mui 사용해서 install 해야함..
  //npm install @mui/material @emotion/react @emotion/styled
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
        <TextInput placehold={"리뷰를 작성해주세요 (140자 이하)"} />
        <BigBtn name="작성완료" />
      </Body>
    </Page>
  );
}
