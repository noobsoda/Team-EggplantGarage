import React, { useState } from "react";
import styled from "styled-components";
import MidBtn from "../Atoms/Buttons/MediumBtn";
import BigBtn from "../Atoms/Buttons/BigBtn";
import TitleCategoryBox from "../Templates/LiveShowSubmit/TitleCategoryBox";
import PictureSubmitBox from "../Templates/LiveShowSubmit/PictureSubmitBox";
import ProductSubmitBox from "../Templates/LiveShowSubmit/ProductSubmitBox";
import ProductListBox from "../Templates/LiveShowSubmit/ProductListBox";
import ProuctModifyBox from "../Templates/LiveShowSubmit/ProductModifyBox";
import Tapbar from "../Organisms/Tapbar";

const StyledBox = styled.div`
  display: flex;
  width: 1440px;
  transform: ${(props) => `translateX(${-props.phase * 360}px)`};
  transition: transform 0.2s ease-in-out;
`;

const StyledWindow = styled.div`
  display: flex;
  overflow: hidden;
  width: 360px;
`;

export default function LiveShowSubmit() {
  const [step, setStep] = useState(0);
  const [isModify, setIsModify] = useState(false);

  const [title, setTitle] = useState({ value: "", check: true });
  const [categorys, setCategorys] = useState({ value: [], check: true });
  const [image, setImage] = useState({ value: "", check: true });
  const [product, setProduct] = useState({ value: [], check: true });

  function nextStep() {
    if (step === 3) return;
    setStep(step + 1);
  }

  function backStep() {
    if (step === 0) return;
    setStep(step - 1);
  }

  //제목 입력
  function titleValue(e) {
    setTitle(e.target.value);
  }

  //카테고리 입력
  function onChange(e) {
    if (e.target.value === "") return; //빈값 제외
    //이미 존재한지 확인
    if (categorys.value.includes(e.target.value)) return;

    setCategorys({ value: [...categorys.value, e.target.value], check: true });
  }
  function delCategory(categoryName) {
    setCategorys({
      value: categorys.value.filter((ele) => ele !== categoryName),
      check: true,
    });
  }
  return (
    <div>
      <StyledWindow>
        <StyledBox phase={step}>
          <TitleCategoryBox
            onTitleChange={titleValue}
            categorys={categorys.value}
            onCategoryChange={onChange}
            delCategory={delCategory}
          />
          <PictureSubmitBox />
          <ProductSubmitBox />
          <ProductListBox />
        </StyledBox>
      </StyledWindow>
      {step === 0 ? (
        <BigBtn name="NEXT" buttonClick={nextStep} />
      ) : (
        <>
          <MidBtn name="PREV" buttonClick={backStep} />
          <MidBtn name="NEXT" buttonClick={nextStep} />
        </>
      )}

      <Tapbar />
      {isModify ? <ProuctModifyBox /> : <></>}
    </div>
  );
}
