import React, { useState } from "react";

//redux
import { useSelector } from "react-redux";
import { checkIsLogin } from "../../store/user";

import Header from "../../Templates/Layout/Header";
import Body from "../../Templates/Layout/Body";
import Page from "../../Templates/Layout/Page";
import styled from "styled-components";
import LiveshowItem from "../../Molecules/Cards/LiveshowItem";
import LiveStartBtn from "../../Atoms/IconButtons/LiveStartBtn";
import CategoryNav from "../../Molecules/Category/CategoryNav";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Container from "../../Templates/Layout/Container";

export default function Main() {
  const isLogin = useSelector(checkIsLogin);

  const [allLives, setAllLives] = useState(undefined);
  //liveContentList 까지 가야됨.
  const navigate = useNavigate();
  function startLive() {
    navigate("/liveshowsubmit");
  }
  useEffect(() => {
    //로그인 확인
    // console.log(isLogin);
    // if (!isLogin) {
    //   navigate("/login");
    // }
    // getAllLives(({ data }) => {
    //   setAllLives(data.liveContentList);
    // });
  }, []);

  return (
    <Page>
      {/* 헤더 */}
      <Header isLogo={true} />
      <Body>
        <div className="page-header" style={{ marginBottom: "8px" }}>
          주변 라이브쇼
        </div>
        <Container>
          <LiveshowItem isViewer={true} />
          <LiveshowItem isViewer={true} />
          <LiveshowItem isViewer={true} />
          <LiveshowItem isViewer={true} />
        </Container>
        <div className="page-header" style={{ marginBottom: "8px" }}>
          전국 라이브쇼
        </div>
        <CategoryNav />
        <Container>
          {allLives &&
            allLives.map((show) => {
              return <LiveshowItem key={show.id} show={show} isViewer={true} />;
            })}
          {allLives &&
            allLives.map((show) => {
              return <LiveshowItem key={show.id} show={show} isViewer={true} />;
            })}
        </Container>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <LiveStartBtn buttonClick={startLive} />
        </div>
      </Body>
    </Page>
  );
}
