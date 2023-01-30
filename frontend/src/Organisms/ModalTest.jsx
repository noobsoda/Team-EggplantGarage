import React from "react";
import styled from "styled-components";
import Modal from "../Atoms/Modal";

const FlexDiv = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-between;
`;

export default function ModalTest({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <Modal>
      <button onClick={closeModal}>X</button>
    </Modal>
  );
}
