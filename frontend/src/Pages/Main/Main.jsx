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
import { getLives } from "../../util/api/liveApi";
import { useDispatch } from "react-redux";
import { setLocation } from "../../store/location";

export default function Main() {
  const isLogin = useSelector(checkIsLogin);

  const [allLives, setAllLives] = useState(undefined);
  const [aroundLives, setAroundLives] = useState(undefined);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [selected, setSelected] = useState("인기");
  //liveContentList 까지 가야됨.
  const navigate = useNavigate();
  function startLive() {
    navigate("/liveshowsubmit");
  }
  const dispatch = useDispatch();
  useEffect(() => {
    //로그인 확인
    console.log(isLogin);
    // if (!isLogin) {
    //   navigate("/login");
    // }
    if (navigator.geolocation) {
      // console.log("왜 안들어와");
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      //이부분만 있으면 라이브쇼 시작할때 위도 경도도 가져올 수 있음
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }

    let aroundSearchCondition = {
      distanceSort: "ASC",
      latitude: lat,
      longitude: lng,
      national: false,
    };
    getLives(aroundSearchCondition, ({ data }) => {
      console.log(data.liveContentList);
      console.log(aroundSearchCondition);
      setAroundLives(data.liveContentList);
    });

    let nationalSearchCondition = {
      category: selected,
      joinUserSort: "DESC",
      latitude: 0,
      longitude: 0,
      national: true,
    };
    getLives(nationalSearchCondition, ({ data }) => {
      console.log(data.liveContentList);
      console.log(nationalSearchCondition);
      setAllLives(data.liveContentList);
    });
    let location = { lat: lat, lng: lng };
    dispatch(setLocation(location));
  }, [selected, lat, lng]);

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
        <CategoryNav setSelected={setSelected} />
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
