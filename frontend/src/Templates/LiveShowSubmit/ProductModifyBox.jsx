import React, { useState, useEffect } from "react";
import InputBox from "../../Atoms/Inputs/BigInput";
import Checkbox from "../../Molecules/Input/CheckBox";
import Button from "../../Atoms/Buttons/SmallBtn";
import ImageBox from "../../Atoms/canvas/ImageBox";

export default function ProductModifyBox({ imgSrc, modifyProduct, productList, setProductList }) {
  const [modifyData, setModifyData] = useState({});
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    setModifyData(modifyProduct);
    setName(modifyProduct.productName);
    setPrice(modifyProduct.productPrice);
    console.log(modifyProduct);
  }, [modifyProduct]);
  function changeData({ key, data }) {
    if (key === "name") {
      setName(data);
    } else if (key === "price") {
      setPrice(data);
    }
  }

  return (
    <div>
      <h1 className="page-header">물품 수정</h1>
      <div>
        <ImageBox
          imgSrc={imgSrc}
          leftTopX={modifyData.leftTopX}
          rightBottomX={modifyData.rightBottomX}
          leftTopY={modifyData.leftTopY}
          rightBottomY={modifyData.rightBottomY}
          boxSize="75"
        />
      </div>
      <InputBox
        placehold="제품명을 입력하세요"
        inputValue={(e) => changeData({ key: "name", data: e.target.value })}
        value={name}
      />
      <Checkbox id="price" text="즉시구매가" />
      <InputBox
        placehold="즉시구매가를 입력하세요"
        inputValue={(e) => changeData({ key: "price", data: e.target.value })}
        value={price}
      />
      <div>
        <Button name="취소" />
        <Button name="삭제" />
        <Button name="수정" />
      </div>
    </div>
  );
}
