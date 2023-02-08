import React from "react";
import InputBox from "../../Atoms/Inputs/BigInput";
import Checkbox from "../../Molecules/Input/CheckBox";
import Button from "../../Atoms/Buttons/SmallBtn";
export default function ProductModifyBox({ modifyProduct }) {
  return (
    <div>
      <h1 className="page-header">물품 수정</h1>
      <div>
        <canvas></canvas>
      </div>
      <InputBox placehold="제품명을 입력하세요" />
      <Checkbox id="price" text="즉시구매가" />
      <InputBox placehold="즉시구매가를 입력하세요" />
      <div>
        <Button name="취소" />
        <Button name="삭제" />
        <Button name="수정" />
      </div>
    </div>
  );
}
