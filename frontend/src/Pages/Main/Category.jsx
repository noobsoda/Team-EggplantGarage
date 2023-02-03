import React from "react";
import Header from "../Organisms/Header";
import Page from "../Templates/Page";
import CategoryBody from "../../Organisms/Body/CategoryBody";

export default function Category() {
  return (
    <Page>
      <Header isName="True" headerName="카테고리" />
      <CategoryBody />
    </Page>
  );
}
