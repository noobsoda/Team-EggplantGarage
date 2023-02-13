import React, { useState, useEffect } from "react";
import styled from "styled-components";

import InputBox from "../../Atoms/Inputs/BigInput";

import CropBox from "../../Organisms/LiveSubmit/CropBox";
import { isNumber } from "../../util/regex";

const StyledBox = styled.div`
  width: 360px;
`;

export default function ProductModifyBox({
  imgSrc,
  modifyProduct,
  productList,
  setProductList,
  deleteProduct,
  backStep,
}) {
  const [modifyData, setModifyData] = useState({}); //수정될 데이터
  const [name, setName] = useState(""); //수정하는 제품 이름
  const [price, setPrice] = useState(""); //수정하는 제품의 가격
  const [goCrop, setGoCrop] = useState(true); //자르기 진행

  useEffect(() => {
    setModifyData(modifyProduct);
    setName(modifyProduct.productName);
    setPrice(modifyProduct.productPrice);
    setGoCrop(!goCrop);
  }, [modifyProduct]);

  /**
   * 값입력시 수정된 값 입력
   * @param {*} param0
   */
  function changeData({ key, data }) {
    if (key === "name") {
      setName(data);
    } else if (key === "price") {
      setPrice(data);
    }
  }

  /**
   * 상품 수정 진행
   */
  function modiProduct() {
    //제목 확인
    if (name === "") {
      alert("제목을 입력해주세요");
      return;
    }
    //가격 숫자만 입력
    //숫자만 입력햇는지 확인
    if (price !== "" && !price.match(isNumber)) {
      alert("숫자만 입력해주세요");
      return;
    }

    let productTmp = productList;
    for (let i = 0; i < productList.length; i++) {
      if (productTmp[i].id === modifyData.id) {
        productTmp[i].productName = name;
        productTmp[i].productPrice = price === "" ? 0 : price;
      }
    }

    setProductList({ value: productTmp, check: true }); //바뀐 값으로 수정
    backStep(); //뒤로 이동
  }

  /**
   * 상품 삭제
   */
  function delProduct() {
    deleteProduct(modifyData.id); //해당 id의 상품 삭제
    backStep(); //뒤로 이동
  }
  return (
    <StyledBox>
      <h1 className="page-header">물품 수정</h1>
      <CropBox
        imgSrc={imgSrc}
        startPos={[modifyData.leftTopX, modifyData.leftTopY]}
        endPos={[modifyData.rightBottomX, modifyData.rightBottomY]}
        goCrop={goCrop}
        cancel={delProduct}
        submit={modiProduct}
        add
      />
      <InputBox
        placehold="제품명을 입력하세요"
        inputValue={(e) => changeData({ key: "name", data: e.target.value })}
        value={name || ""}
      />
      <InputBox
        placehold="즉시구매가를 입력하세요"
        inputValue={(e) => changeData({ key: "price", data: e.target.value })}
        value={price || ""}
      />
    </StyledBox>
  );
}
