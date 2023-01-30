import React from "react";
import Header from "../Organisms/Header";
import Page from "../Atoms/Page";
import SearchBody from "../Organisms/SearchBody";
import SmallSelect from "../Atoms/Select/SmallSelect";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ModalTest from "../Organisms/ModalTest";

export default function Search() {
  const location = useLocation();
  let isResult = false;
  if (location.state !== null) {
    isResult = location.state.isResult;
  }

  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };
  return (
    <Page>
      <Header isSearch="True" />
      <SmallSelect name="지역설정" />
      <SmallSelect name="카테고리" />
      <SmallSelect name="정렬방법" />
      {/* isSearch가 True일때만 영상들이 뽑혀나오게 하자 */}
      {isResult ? <SearchBody /> : <></>}
      <div></div>
      <button onClick={showModal}>모달 띄우기TEST</button>
      {modalOpen && <ModalTest setModalOpen={setModalOpen} />}
    </Page>
  );
}
