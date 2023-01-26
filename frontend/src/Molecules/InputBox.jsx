import React from "react";
import BigInput from "../Atoms/Inputs/BigInput";
import RedParagraph from "../Atoms/Text/RedParagraph";

export default function InputBox({ placehold, text, isCheck }) {
  return (
    <div>
      <BigInput placehold={placehold} />
      {isCheck ? <></> : <RedParagraph text={text} />}
    </div>
  );
}
