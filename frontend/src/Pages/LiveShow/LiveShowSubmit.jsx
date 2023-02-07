import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import MidBtn from "../../Atoms/Buttons/MediumBtn";
import BigBtn from "../../Atoms/Buttons/BigBtn";

import PictureBox from "../../Organisms/Camera/PictureBox";

import TitleCategoryBox from "../../Templates/LiveShowSubmit/TitleCategoryBox";
import PictureSubmitBox from "../../Templates/LiveShowSubmit/PictureSubmitBox";
import ProductSubmitBox from "../../Templates/LiveShowSubmit/ProductSubmitBox";
import ProductListBox from "../../Templates/LiveShowSubmit/ProductListBox";
import ProuctModifyBox from "../../Templates/LiveShowSubmit/ProductModifyBox";
import Header from "../../Templates/Layout/Header";
import Page from "../../Templates/Layout/Page";
import Body from "../../Templates/Layout/Body";

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
const BtnFlex = styled.div`
  display: flex;
  justify-content: space-around;
  /* position: absolute; */
  /* width: 100%; */
  /* left: 0px; */
  /* bottom: 72px; */
`;

export default function LiveShowSubmit() {
  const navigate = useNavigate();

  const [imgSrc, setImgSrc] = useState("//:0"); //회전후 결과를 담는 canvas

  const [step, setStep] = useState(0);
  const [isModify, setIsModify] = useState(false);

  const [title, setTitle] = useState({ value: "", check: false });
  const [categorys, setCategorys] = useState({ value: [], check: false });
  const [productList, setProductList] = useState({ value: [], check: false });

  const [camera, setCamera] = useState(false);
  function nextStep() {
    if (step === 3) return;

    //이미지를 등록해야 다음으로
    if (step === 1) {
      if (imgSrc === "//:0") {
        alert("사진을 찍어주세요");
        return;
      }
    }
    setStep(step + 1);
  }

  function backStep() {
    if (step === 0) return;
    setStep(step - 1);
  }

  //제목 입력
  function titleValue(e) {
    if (e.target.value === "") {
      setTitle({ value: e.target.value, check: false });
    } else {
      setTitle({ value: e.target.value, check: true });
    }
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
      check: categorys.value.length === 1 ? false : true, //1개남았을때 삭제하면 false, 그외는 true
    });
  }

  /**
   * 카메라 키고 끄기
   */
  function cameraEvent(flag) {
    setCamera(flag);
  }
  /**
   * 방송 시작을 위한 정보 전송
   */
  function goLive() {
    // console.log("방송시작");
    //제목
    // console.log(`방송 제목 ${title.value},${title.check}`);

    //카테고리들
    // console.log(`카테고리 ${categorys.value},${categorys.check}`);

    //이미지 소스
    // console.log(`이미지 ${imgSrc}`);

    //물품정보
    //---제품 이미지 위치
    //---제품명
    //---제품가격
    // console.log(`물품 리스트 ${productList.value},${productList.check}`);

    //판매자(나) 이메일

    navigate("/liveshowseller/12");
  }
  return (
    <Page>
      <Header isName={true} headerName="라이브쇼 등록" />
      <Body>
        <StyledWindow>
          <StyledBox phase={step}>
            <TitleCategoryBox
              onTitleChange={titleValue}
              categorys={categorys.value}
              onCategoryChange={onChange}
              delCategory={delCategory}
            />
            <PictureSubmitBox imgSrc={imgSrc} cameraEvent={cameraEvent} />

            <ProductSubmitBox
              imgSrc={imgSrc}
              productList={productList}
              setProductList={setProductList}
            />
            <ProductListBox imgSrc={imgSrc} productList={productList} />
          </StyledBox>
        </StyledWindow>
        <BtnFlex>
          {step === 0 ? (
            <BigBtn name="NEXT" buttonClick={nextStep} />
          ) : step === 3 ? (
            <>
              <MidBtn name="PREV" buttonClick={backStep} />
              <MidBtn name="방송시작" buttonClick={goLive} />
            </>
          ) : (
            <>
              <MidBtn name="PREV" buttonClick={backStep} />
              <MidBtn name="NEXT" buttonClick={nextStep} />
            </>
          )}
        </BtnFlex>
        {isModify ? <ProuctModifyBox /> : <></>}
      </Body>
      {camera ? (
        <PictureBox setOriImgSrc={setImgSrc} cameraEvent={cameraEvent} />
      ) : (
        <></>
      )}
    </Page>
  );
}
