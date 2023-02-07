import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkUserInfo } from "../../store/user";

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

import {
  createLive,
  setLiveCategory,
  setLiveImage,
  createLiveOld,
  setLiveCategoryOld,
  setLiveImageOld,
} from "../../util/api/liveApi";
import { setLiveProduct } from "../../util/api/productApi";
import { dataURItoBlob } from "../../util/data";

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
`;

export default function LiveShowSubmit() {
  const userInfo = useSelector(checkUserInfo);
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
    //제목
    if (!title.check) {
      alert("제목을 작성해주세요");
      setStep(0);
      return;
    }
    //카테고리들
    if (!categorys.check) {
      alert("카테고리를 입력해주세요");
      setStep(0);
      return;
    }

    if (!productList.check) {
      alert("물품을 한개이상 등록해주세요");
      setStep(2);
      return;
    }
    //판매자(나) 이메일

    //라이브 방 만들기

    const id = "test";

    const liveInfo = {
      title: title.value,
      description: "",
      // url: `${process.env.REACT_APP_API_URL}test/${id}`,
      url: `14321dsafdsaesfdsafsafeaewa`,
      live: true,
      latitude: "",
      longitude: "",
      sessionId: id,
    };

    createLiveOld(
      id,
      liveInfo,
      async ({ data }) => {
        console.log("방은 만들어졌다.");
        console.log(data);
        const liveId = 1;

        //라이브 카테고리 등록
        const categoryInfo = {
          sessionId: id,
          liveCategoryReqList: categorys.value.map((ele) => {
            return { categoryName: ele };
          }),
        };
        await setLiveCategoryOld(
          id,
          categoryInfo,
          ({ data }) => {
            console.log("카테고리 성공");
          },
          () => {
            console.log("카테고리 실패");
          }
        );

        //라이브 상품등록
        let formData = new FormData(); // formData 객체를 생성한다.
        const productInfo = productList.value.map((ele) => {
          return {
            liveId: liveId,
            sellerId: id,
            name: ele.productName,
            initialPrice: ele.productPrice,
            leftTopX: ele.leftTopX,
            leftTopY: ele.leftTopY,
            rightBottomX: ele.rightBottomX,
            rightBottomY: ele.rightBottomY,
          };
        });

        formData.append("productList", productInfo); //상품 정보
        formData.append("img", dataURItoBlob(imgSrc)); //이미지 소스

        await setLiveProduct(
          formData,
          ({ data }) => {
            console.log("상품 등록 성공");
          },
          () => {
            console.log("상품 등록 실패");
          }
        );

        //섬네일 지정
        formData = new FormData(); // formData 객체를 생성한다.
        let file = dataURItoBlob(imgSrc);
        formData.append("img", file);
        await setLiveImageOld(
          "test@test.com",
          formData,
          ({ data }) => {
            console.log("이미지 성공");
          },
          () => {
            console.log("이미지 실패");
          }
        );

        console.log("방이 다 만들어졌다");
        // navigate(`/liveshowseller/${id}`);
        // navigate(`/liveshowseller/1231`);
      },
      (e) => {
        console.log(e);
      }
    );
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
