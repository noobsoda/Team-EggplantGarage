import React from "react";
import Header from "../Organisms/Header";
import Page from "../Atoms/Page";
import Body from "../Atoms/Body";
import SmallSelect from "../Atoms/Select/SmallSelect";

export default function Search() {
  return (
    <Page>
      <Header isSearch="True" />
      <Body>
        <SmallSelect name="지역설정" />
        <SmallSelect name="지역설정" />
        <SmallSelect name="지역설정" />
      </Body>
    </Page>
  );
}
