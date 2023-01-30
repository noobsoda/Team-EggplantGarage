import React from "react";
import styled from "styled-components";
import MediumBtn from "../Atoms/Buttons/MediumBtn";
import Modal from "../Atoms/Modal";
import ModalBody from "../Templates/Modal/ModalBody";
import { useEffect } from "react";

const { kakao } = window;

const Header = styled.div`
  width: 360px;
  display: flex;
  color: ${({ theme }) => theme.color.white};
`;
const CloseBtn = styled.button`
  width: 40px;
  height: 24px;
  //   background: url("/image/close.svg") norepeat 24px 16px;
  background: url("/image/close.svg");
  background-repeat: no-repeat;
  background-position: 16px 0px;
`;

export default function ModalSetLocation({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };
  const apply = () => {
    closeModal();
  };
  const Map = () => {
    useEffect(() => {
      let container = document.getElementById("map");

      let options = {
        center: new window.kakao.maps.LatLng(35.85133, 127.734086),
        level: 13,
      };

      let map = new window.kakao.maps.Map(container, options);

      console.log("loading kakaomap");
    }, []);
  };
  return (
    <Modal>
      <div height="24px" className="page-header">
        　
      </div>
      <Header>
        <CloseBtn onClick={closeModal} />
        <div className="page-header" height>
          지역설정
        </div>
      </Header>
      <ModalBody>
        <div width="280px" height="280px" id="map">
          야호
        </div>
        <MediumBtn name="초기화" />
        <MediumBtn name="적용" buttonClick={apply} />
      </ModalBody>
    </Modal>
  );
}
