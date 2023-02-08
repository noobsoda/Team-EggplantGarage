import React, { useState } from "react";
import styled from "styled-components";
import BigBtn from "../../Atoms/Buttons/BigBtn";
import Modal from "../../Atoms/Modal/Modal";
import ModalBody from "../../Templates/Modal/ModalBody";
import MapContainer from "./MapContainer";

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
const FlexBox = styled.div`
  display: flex;
  height: calc(20vh - 80px);
  justify-content: center;
  align-items: flex-end;
  column-gap: 16px;
`;
export default function ModalSetLocation({ setModalOpen, setCoordinate }) {
  const [location, setLocation] = useState(null);
  const closeModal = () => {
    setModalOpen(false);
  };
  const apply = () => {
    setCoordinate(location);
    closeModal();
  };
  const send = (data) => {
    setLocation(data);
  };
  return (
    <Modal>
      <Header>
        <CloseBtn onClick={closeModal} />
        <div className="page-header">지역설정</div>
      </Header>
      <ModalBody>
        <MapContainer selectedLocation={send} />
        <FlexBox>
          <BigBtn name="적용" buttonClick={apply} />
        </FlexBox>
      </ModalBody>
    </Modal>
  );
}
