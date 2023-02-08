import React from "react";
import MidInput from "../../Atoms/Inputs/MidInput";
import Button from "../../Atoms/Buttons/SmallStrokeBtn";
import RedParagraph from "../../Atoms/Text/RedParagraph";
import styled from "styled-components";

const FlexBox = styled.div`
  display: flex;
  column-gap: 8px;
  align-items: center;
`;

export default function InputButtonbox({
  placehold,
  buttonName,
  text,
  isCheck,
}) {
  return (
    <div>
      <FlexBox>
        <MidInput placehold={placehold} />
        <Button name={buttonName}></Button>
      </FlexBox>
      {isCheck ? <></> : <RedParagraph text={text} />}
    </div>
  );
}
