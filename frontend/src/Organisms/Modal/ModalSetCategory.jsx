import React from "react";
import styled from "styled-components";
import BigBtn from "../../Atoms/Buttons/BigBtn";
import CategoryCheckBtn from "../../Atoms/Buttons/CategoryCheckBtn";
import Modal from "../../Atoms/Modal/Modal";
import ModalBody from "../../Templates/Modal/ModalBody";
import { useState } from "react";
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
const categories = [
  "전체",
  "인기",
  "디지털기기",
  "생활가전",
  "가구",
  "생활/주방",
  "유아용품",
  "유아도서",
  "여성의류",
  "여성잡화",
  "남성의류",
  "남성잡화",
  "뷰티/미용",
  "스포츠",
  "취미/게임",
  "음반",
  "도서",
  "티켓",
  "반려동물",
  "식물",
  "기타",
];
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
          {categories.map((text, index) => {
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
