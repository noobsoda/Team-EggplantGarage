import React from "react";
import MainHeader from "../Organisms/MainHeader";
import MainBody from "../Organisms/MainBody";
import Tapbar from "../Organisms/Tapbar";

export default function Main() {
  return (
    <div>
      {/* 헤더 */}
      <MainHeader />
      <hr />
      <MainBody />
      <hr />
      <Tapbar />
    </div>
  );
}
