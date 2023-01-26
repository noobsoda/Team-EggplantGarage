import React, { useState } from "react";
import BigBtn from "../Atoms/Buttons/BigBtn";
import TitleCategoryBox from "../Templates/LiveShowSubmit/TitleCategoryBox";
import PictureSubmitBox from "../Templates/LiveShowSubmit/PictureSubmitBox";
import ProductSubmitBox from "../Templates/LiveShowSubmit/ProductSubmitBox";
import ProductListBox from "../Templates/LiveShowSubmit/ProductListBox";
import ProuctModifyBox from "../Templates/LiveShowSubmit/ProductModifyBox";
import styled from "styled-components";

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

  function nextStep() {
    if (step === 3) return;
    setStep(step + 1);
  }
  function backStep() {
    setStep(step - 1);
  }

  return (
    <div>
      <StyledWindow>
        <StyledBox phase={step}>
          <TitleCategoryBox />
          <PictureSubmitBox />
          <ProductSubmitBox />
          <ProductListBox />
        </StyledBox>
      </StyledWindow>
      <BigBtn name="NEXT" buttonClick={nextStep}></BigBtn>
      <ProuctModifyBox />
    </div>
  );
}
