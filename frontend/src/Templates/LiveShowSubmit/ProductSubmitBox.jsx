import React, { useRef, useState, useEffect } from "react";
import CropBox from "../../Organisms/LiveSubmit/CropBox";
import InputBox from "../../Molecules/Input/InputBox";
import Checkbox from "../../Molecules/Input/CheckBox";

import styled from "styled-components";
const StyledBox = styled.div`
  /* width: 360px; */
  /* flex: 1 1; */
  width: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  row-gap: 8px;
`;

const StyledNoneCanvas = styled.canvas`
  display: None;
`;

const StyledCanvas = styled.canvas`
  width: 100%;
`;

const StyledResultBox = styled.div`
  width: 100%;
`;

export default function ProductSubmitBox({
  imgSrc,
  productList,
  setProductList,
}) {
  const originCanvas = useRef(undefined); //원본 그림 저장
  const drawCanvas = useRef(undefined); //실제 그리는 영역

  const [startPos, setStartPos] = useState([0, 0]); //클릭시 위치로 시작 위치가 된다.
  const [endPos, setEndPos] = useState([0, 0]);
  const [isdrawing, setIsDrawing] = useState(false); //현재 그리고 있는지 여부
  const [goCrop, setGoCrop] = useState(true);
  const [goCropRest, setGoCropRest] = useState(true);

  const [ctx, setCtx] = useState(null); //실제 그리는 영역의 canvas

  const [img, setImg] = useState(undefined); //원본 이미지

  const [ratio, setRatio] = useState(0.0); //원본이미지와 canvas의 비율

  //제품명, 제품가격
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  //제품가격 체크박스
  const [check, setCheck] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = function () {
      //원본 캔버스
      originCanvas.current.width = img.width;
      originCanvas.current.height = img.height;
      originCanvas.current.getContext("2d").drawImage(img, 0, 0);

      //실제 그리는 캔버스
      drawCanvas.current.width = img.width;
      drawCanvas.current.height = img.height;
      drawCanvas.current.getContext("2d").drawImage(img, 0, 0);
      setImg(img);

      //비율 계산
      //실제 이미지크기->canvas에 그려진 크기의 비율 구하기
      //canvas그려질 크기/실제 이미지 크기
      //실제 이미지 크기drawCanvas.current.width
      //캔버스의 크기 drawCanvas.current.clientWidth
      setRatio(drawCanvas.current.clientWidth / drawCanvas.current.width);
    };
    setCtx(drawCanvas.current.getContext("2d"));
  }, [imgSrc]);

  /**
   * 마우스 그리기 시작
   *
   * @param {*} e
   */
  function startDrawing(e) {
    let offsetX = null;
    let offsetY = null;
    if (e.type === "mousedown") {
      offsetX = e.nativeEvent.offsetX;
      offsetY = e.nativeEvent.offsetY;
    } else {
      const bcr = e.target.getBoundingClientRect();
      offsetX = e.targetTouches[0].clientX - bcr.x;
      offsetY = e.targetTouches[0].clientY - bcr.y;
    }
    setIsDrawing(true);

    ctx.beginPath(); //선그리기 시작

    setStartPos([offsetX / ratio, offsetY / ratio]); //현제 위치

    ctx.moveTo(offsetX, offsetY); //선 그리기 시작
  }
  /**
   * 마우스 그리기 종료
   * @param {*} e
   */
  function finishDrawing() {
    // CropImage(endPos[0] - startPos[0], endPos[1] - startPos[1]);
    setGoCrop(!goCrop);
    setIsDrawing(false);
  }

  /**
   * 사각형 그리기
   * @param {*} e
   * @returns
   */
  function drawSquareImage(e) {
    let offsetX = null;
    let offsetY = null;
    if (e.type === "mousemove") {
      offsetX = e.nativeEvent.offsetX;
      offsetY = e.nativeEvent.offsetY;
    } else {
      const bcr = e.target.getBoundingClientRect();
      offsetX = e.targetTouches[0].clientX - bcr.x;
      offsetY = e.targetTouches[0].clientY - bcr.y;
    }
    if (!isdrawing) return;
    //canvas지우기
    ctx.clearRect(0, 0, drawCanvas.current.width, drawCanvas.current.height);
    //이미지 다시 그리기
    ctx.drawImage(img, 0, 0, img.width, img.height);
    //빨간 선
    ctx.strokeStyle = "red";
    //사각형 그리기

    ctx.strokeRect(
      startPos[0],
      startPos[1],
      offsetX / ratio - startPos[0],
      offsetY / ratio - startPos[1]
    );
    setEndPos([offsetX / ratio, offsetY / ratio]);
  }

  /**
   * 제품 명
   */
  function onProductName(e) {
    setProductName(e.target.value);
  }

  /**
   * 제품 가격
   */
  function onProductPrice(e) {
    setProductPrice(e.target.value);
  }

  /**
   * 영역이 제대로 선택 되었는지 확인
   */
  function checkArea() {
    if (endPos[0] - startPos[0] > 30 && endPos[1] - startPos[1] > 30) {
      return true;
    }
    return false;
  }
  /**
   * 상품 등록 진행
   */
  function addProduct() {
    //입력이 다 되었는지 확인

    //영역 선택 확인
    //가로 30이상
    //세로 30이상
    if (!checkArea()) {
      alert("영역이 너무 작습니다.");
      return;
    }
    //제품명 확인
    if (productName === "") {
      alert("제목을 입력해주세요");
      return;
    }
    //즉시구매가 확인
    let price = 0; //기본 0원
    if (check) {
      if (productPrice === "") {
        alert("구매가를 입력해주세요");
        return;
      }
      price = productPrice;
    }

    setProductList({
      value: [
        ...productList.value,
        {
          id: id,
          productName: productName,
          productPrice: price,
          leftTopX: startPos[0],
          leftTopY: startPos[1],
          rightBottomX: endPos[0],
          rightBottomY: endPos[1],
        },
      ],
      check: true,
    });
    //상품 구분 번호
    setId(id + 1);
    //초기화
    reset();
  }

  function reset() {
    //초기화
    setProductName("");
    setProductPrice("");
    setStartPos([0, 0]);
    setEndPos([0, 0]);

    // canvas 초기화
    ctx.drawImage(img, 0, 0, img.width, img.height);
    setGoCropRest(!goCropRest);
  }

  function onCheckChange(e) {
    if (e.target.checked) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }

  return (
    <StyledBox>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledNoneCanvas ref={originCanvas}></StyledNoneCanvas>
      </div>
      <div>
        <StyledCanvas
          ref={drawCanvas}
          onMouseUp={finishDrawing}
          onMouseDown={startDrawing}
          onMouseMove={drawSquareImage}
          onTouchStart={startDrawing}
          onTouchEnd={finishDrawing}
          onTouchMove={drawSquareImage}
        ></StyledCanvas>
      </div>
      <StyledResultBox>
        <CropBox
          imgSrc={imgSrc}
          cancel={reset}
          submit={addProduct}
          startPos={startPos}
          endPos={endPos}
          goCrop={goCrop}
          goCropRest={goCropRest}
        />
        <div>
          <InputBox
            placehold="제품명을 입력하세요"
            onChange={onProductName}
            value={productName}
          />
          <Checkbox
            id="price"
            text="즉시구매가 입력하기"
            textSize="body1-regular"
            check={check}
            setCheck={onCheckChange}
          />
          <InputBox
            placehold="즉시구매가를 입력하세요"
            onChange={onProductPrice}
            value={productPrice}
            disabled={!check}
          />
        </div>
      </StyledResultBox>
    </StyledBox>
  );
}
