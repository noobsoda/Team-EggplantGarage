import React, { useState } from "react";
import styled from "styled-components";
import BigBtn from "../../Atoms/Buttons/BigBtn";
import ModalSmall from "../../Atoms/Modal/ModalSmall";
import ModalBody from "../../Templates/Modal/ModalBody";

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
  flex-direction: column;
  justify-content: flex-end;
  height: calc(20vh - 80px);
`;
const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  height: calc(20vh - 48px);
  padding: 24px;
`;
const SortBox = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 24px;
`;
export default function ModalSetSort({ setModalOpen, sort }) {
  const [isViewerCnt, SetIsViewerCnt] = useState(true);
  const closeModal = () => {
    setModalOpen(false);
  };
  const apply = () => {
    sort(isViewerCnt);
    closeModal();
  };
  return (
    <ModalSmall>
      <Header>
        <CloseBtn onClick={closeModal} />
        <div className="page-header">정렬</div>
      </Header>
      <ModalBody>
        <SelectBox>
          <SortBox
            onClick={() => {
              SetIsViewerCnt(true);
            }}
            style={{ color: isViewerCnt ? "white" : "grey" }}
          >
            시청자순
          </SortBox>
          <SortBox
            onClick={() => {
              SetIsViewerCnt(false);
            }}
            style={{ color: isViewerCnt ? "grey" : "white" }}
          >
            가까운순
          </SortBox>
        </SelectBox>
        <FlexBox>
          <BigBtn name="적용" buttonClick={apply} />
        </FlexBox>
      </ModalBody>
    </ModalSmall>
  );
}
