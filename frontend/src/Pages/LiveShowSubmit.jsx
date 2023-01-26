import React from "react";
import BigButton from "../Atoms/Buttons/BigButtonColor";

export default function LiveShowSubmit() {
  function test() {
    alert("hihi");
  }
  return (
    <div>
      <BigButton name="NEXT" buttonClick={test}></BigButton>
    </div>
  );
}
