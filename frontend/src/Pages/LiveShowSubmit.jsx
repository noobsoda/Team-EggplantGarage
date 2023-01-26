import React from "react";
import BigBtn from "../Atoms/Buttons/BigBtn";

export default function LiveShowSubmit() {
  function test() {
    alert("hihi");
  }
  return (
    <div>
      <BigBtn name="NEXT" buttonClick={test}></BigBtn>
    </div>
  );
}
