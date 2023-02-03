import React from "react";
import MainBody from "../../Organisms/Body/MainBody";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";

export default function Main() {
  return (
    <Page>
      {/* 헤더 */}
      <Header isLogo="True" />
      <MainBody />
    </Page>
  );
}
