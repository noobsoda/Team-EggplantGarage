import React from "react";
import Header from "../Organisms/Header";
import Page from "../Atoms/Page";
import CategoryBody from "../Organisms/CategoryBody";

export default function Category() {
  return (
    <Page>
      <Header isName="True" headerName="카테고리" />
      <CategoryBody />
    </Page>
  );
}
