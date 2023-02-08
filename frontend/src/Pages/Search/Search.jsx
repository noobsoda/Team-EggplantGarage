import React, { useEffect } from "react";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import Body from "../../Templates/Layout/Body";
import SearchBody from "../../Organisms/Search/SearchBody";
import SmallSelect from "../../Atoms/Select/SmallSelect";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ModalSetLocation from "../../Organisms/Modal/ModalSetLocation";
import ModalSetCategory from "../../Organisms/Modal/ModalSetCategory";
import ModalSetSort from "../../Organisms/Modal/ModalSetSort";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getLives } from "../../util/api/liveApi";

const FlexBox = styled.div`
  display: flex;
  width: 100%;
  column-gap: 8px;
  justify-content: space-between;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  background-color: rgb(0, 0, 0, 0.5);
`;

export default function Search() {
  const initLocation = useLocation();
  const [isResult, setIsResult] = useState(false);
  if (initLocation.state !== null) {
    isResult = initLocation.state.isResult;
  }

  const [modal_1_Open, setModal_1_Open] = useState(false);

  const showModal_1 = () => {
    setModal_1_Open(true);
  };
  const [modal_2_Open, setModal_2_Open] = useState(false);

  const showModal_2 = () => {
    setModal_2_Open(true);
  };
  const [modal_3_Open, setModal_3_Open] = useState(false);

  const showModal_3 = () => {
    setModal_3_Open(true);
  };
  const [category, setCategory] = useState(null);
  const [location, setLocation] = useState(
    useSelector((state) => state.location.location)
  );
  const [sort, setSort] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [searchCondition, setSearchCondition] = useState({});
  const [lives, setLives] = useState([]);
  //true이면 시청자순 false이면 가까운순
  useEffect(() => {
    setSearchCondition({
      category: category,
      distanceSort: sort ? "ASC" : null,
      joinUserSort: sort ? null : "desc",
      latitude: location.lat,
      longitude: location.lng,
      national: true,
      title: "hi",
    });
    getLives(searchCondition, ({ data }) => {
      console.log(data.liveContentList);
      setLives(data.liveContentList);
    });
  }, [category, location, sort, keyword]);

  //카테고리 설정 자식 컴포넌트에서 받아온 callback 함수로받아온걸 데이터로 쏘기
  const selectedCategory = (data) => {
    setCategory(data);
    console.log("카테고리 선택 : " + data);
  };
  const selectedLocation = (data) => {
    setLocation(data);
    console.log(data);
  };
  const sortCallback = (data) => {
    setSort(data);
    console.log(data);
  };
  const keywordValue = (e) => {
    setKeyword(e.target.value);
    // console.log(e.target.value);
  };
  const search = () => {
    console.log(keyword);
    console.log(location);
    console.log(category);
    console.log(sort);
    //이제 통신을해야돼 axios로
    //request body를 만들어서
    // console.log("yaho");
    if (category === 0) {
    }
  };
  return (
    <>
      <Page>
        <Header isSearch={true} search={search} onChangeSearch={keywordValue} />
        <Body>
          <FlexBox>
            <SmallSelect name="지역설정" buttonClick={showModal_1} />
            <SmallSelect name="카테고리" buttonClick={showModal_2} />
            <SmallSelect name="정렬방법" buttonClick={showModal_3} />
          </FlexBox>
          {/* isSearch가 True일때만 영상들이 뽑혀나오게 하자 */}
          {isResult ? <SearchBody /> : <></>}
        </Body>

        {modal_1_Open && (
          <ModalSetLocation
            setCoordinate={selectedLocation}
            setModalOpen={setModal_1_Open}
          />
        )}
        {modal_2_Open && (
          <ModalSetCategory
            select={selectedCategory}
            setModalOpen={setModal_2_Open}
          />
        )}
        {modal_3_Open && (
          <ModalSetSort sort={sortCallback} setModalOpen={setModal_3_Open} />
        )}
      </Page>
      {modal_1_Open || modal_2_Open || modal_3_Open ? (
        <Background></Background>
      ) : (
        <></>
      )}
    </>
  );
}
