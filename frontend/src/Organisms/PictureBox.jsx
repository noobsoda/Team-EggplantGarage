import React from "react";
import Button from "../Atoms/Buttons/ExtraSmallBtn";

export default function PictureBox() {
  return (
    <div>
      <h2 className="body1-header">사진 등록</h2>

      <div>
        <Button name="카메라" />
        <Button name="앨범" />
      </div>

      <div>
        <canvas></canvas>
      </div>
    </div>
  );
}
