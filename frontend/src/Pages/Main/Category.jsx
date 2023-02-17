import React from "react";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import Body from "../../Templates/Layout/Body";
import CategoryBox from "../../Molecules/Category/CategoryBox";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { categoriesImage } from "../../util/category";
const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 8px;
  align-items: flex-start;
  overflow-y: scroll;
  justify-content: space-around;
`;

export default function Category() {
  const navigate = useNavigate();
  function goTo(name) {
    navigate("/search", { state: { category: name, isResult: true } });
  }
  return (
    <Page>
      <Header isName={true} headerName="카테고리" />
      <Body>
        <FlexBox>
          {categoriesImage.map((box, index) => {
            return (
              <CategoryBox
                key={index}
                name={box.name}
                //   imgSrc={box.src}
                imgSrc={"/image/category/" + index + ".png"}
                clicked={() => goTo(box.name)}
                //카테고리 전달해주기
              />
            );
          })}
        </FlexBox>
      </Body>
    </Page>
  );
}
