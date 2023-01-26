import React from "react";
import MidInput from "../Atoms/Inputs/MidInput";
import Button from "../Atoms/Buttons/SmallStrokeButton";
import RedParagraph from "../Atoms/Text/RedParagraph";

export default function InputButtonbox({
  placehold,
  buttonName,
  text,
  isCheck,
}) {
  return (
    <div>
      <MidInput placehold={placehold} />
      <Button name={buttonName}></Button>
      {isCheck ? <></> : <RedParagraph text={text} />}
    </div>
  );
}
