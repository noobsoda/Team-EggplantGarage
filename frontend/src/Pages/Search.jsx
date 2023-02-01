import React from "react";
import Header from "../Organisms/Header";
import Page from "../Atoms/Page";
import SearchBody from "../Organisms/SearchBody";
import SmallSelect from "../Atoms/Select/SmallSelect";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ModalSetLocation from "../Organisms/ModalSetLocation";
import ModalSetCategory from "../Organisms/ModalSetCategory";
import ModalSetSort from "../Organisms/ModalSetSort";

export default function Search() {
  const location = useLocation();
  let isResult = false;
  if (location.state !== null) {
    isResult = location.state.isResult;
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

  return (
    <Page>
      <Header isSearch="True" />
      <SmallSelect name="지역설정" buttonClick={showModal_1} />
      <SmallSelect name="카테고리" buttonClick={showModal_2} />
      <SmallSelect name="정렬방법" buttonClick={showModal_3} />
      {/* isSearch가 True일때만 영상들이 뽑혀나오게 하자 */}
      {isResult ? <SearchBody /> : <></>}
      <div></div>
      {modal_1_Open && <ModalSetLocation setModalOpen={setModal_1_Open} />}
      {modal_2_Open && <ModalSetCategory setModalOpen={setModal_2_Open} />}
      {modal_3_Open && <ModalSetSort setModalOpen={setModal_3_Open} />}
    </Page>
  );
}
