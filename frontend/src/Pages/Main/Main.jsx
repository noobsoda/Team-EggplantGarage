import React from "react";
import Header from "../Organisms/Header";
import MainBody from "../Organisms/MainBody";
import Page from "../Templates/Page";

export default function Main() {
  return (
    <Page>
      {/* 헤더 */}
      <Header isLogo="True" />
      <MainBody />
    </Page>
  );
}
