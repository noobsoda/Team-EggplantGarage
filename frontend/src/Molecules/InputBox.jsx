import React from "react";
import BigInput from "../Atoms/Inputs/BigInput";
import RedParagraph from "../Atoms/Text/RedParagraph";

export default function InputBox({
  placehold,
  text,
  isCheck,
  onChange,
  type,
  value,
}) {
  return (
    <div>
      <BigInput
        type={type}
        placehold={placehold}
        inputValue={onChange}
        value={value}
      />
      {isCheck ? <></> : <RedParagraph text={text} />}
    </div>
  );
}
