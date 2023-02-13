import React from "react";
import styled from "styled-components";
import BigBtn from "../../Atoms/Buttons/BigBtn";
import CategoryCheckBtn from "../../Atoms/Buttons/CategoryCheckBtn";
import Modal from "../../Atoms/Modal/Modal";
import ModalBody from "../../Templates/Modal/ModalBody";
import { useState } from "react";
import { categoriesAll } from "../../util/category";

const Header = styled.div`
  width: 360px;
  display: flex;
  color: ${({ theme }) => theme.color.white};
`;
const CloseBtn = styled.button`
  width: 40px;
  height: 24px;
  background: url("/image/close.svg");
  background-repeat: no-repeat;
  background-position: 16px 0px;
`;

const CBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 24px;
  row-gap: 8px;
  height: calc(50vh);
  overflow-y: scroll;
`;
const FlexBox = styled.div`
  display: flex;
  height: calc(20vh - 80px);
  justify-content: center;
  align-items: flex-end;
  column-gap: 16px;
`;

export default function ModalSetCategory({ setModalOpen, select }) {
  const closeModal = () => {
    setModalOpen(false);
  };
  const apply = () => {
    // console.log(selected);
    select(selected); // 적용시에 parent가 받을 값
    closeModal();
  };
  const [selected, setSelected] = useState(null);

  const handleClick = (text) => {
    setSelected(text);
  };

  return (
    <Modal>
      <Header>
        <CloseBtn onClick={closeModal} />
        <div className="page-header">카테고리</div>
      </Header>
      <ModalBody>
        <CBox>
          {categoriesAll.map((text, index) => {
            return (
              <CategoryCheckBtn
                key={index}
                name={text}
                buttonClick={() => handleClick(text)}
                isClicked={selected === text ? true : false}
              ></CategoryCheckBtn>
            );
          })}
        </CBox>
        <FlexBox>
          <BigBtn name="적용" buttonClick={apply} />
        </FlexBox>
      </ModalBody>
    </Modal>
  );
}
