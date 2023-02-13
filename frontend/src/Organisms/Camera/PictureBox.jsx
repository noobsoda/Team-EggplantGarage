import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const StyledCanvas = styled.canvas`
  display: none;
`;

const StyledCamera = styled.div`
  position: absolute;
  top: 0;
  /* width: 360px;
  height: 640px; */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  z-index: 10;
`;
const StyledVideo = styled.video`
  /* height: 640px; */
  height: 100%;
`;

const StyledBtn = styled.button`
  width: 180px;
  color: white;
  background-color: black;
  font-size: 16px;
  border-radius: 30px;
  border: none;
  padding: 15px 20px;
  text-align: center;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0, 0.2);
  position: absolute;
  bottom: 30px;
`;

const Back = styled.div`
  position: absolute;
  top: 0;
  background-color: black;
  z-index: 10;
  width: 100%;
  height: 100%;
`;

//실제 비디오로 찍는 크기
const VIDEO_RECORD_HEIGHT = 640;
const VIDEO_RECORD_WIDTH = 1024;

//우리가 보는 비디오 표시 크기
const VIDEO_RESULT_HEIGHT = 640;
const VIDEO_RESULT_WIDTH = 360;

//카메라 설정
const getWebcam = (callback) => {
  try {
    //비디오 설정
    const constraints = {
      video: {
        width: VIDEO_RECORD_WIDTH,
        height: VIDEO_RECORD_HEIGHT, // 해상도 설정
        facingMode: "environment", // 셀카카메라 설정. 전면은 "user" 후면은 "environment"
      },
      audio: false,
    };
    navigator.mediaDevices.getUserMedia(constraints).then(callback);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export default function PictureBox({ setOriImgSrc, cameraEvent }) {
  const videoRef = useRef(null); //비디오 태그
  const canvasRef = useRef(null); //비디오를 담는 canvas
  const canvasRef2 = useRef(null); //회전후 결과를 담는 canvas

  useEffect(() => {
    startCamera();
  }, []);

  //카메라 실행
  function startCamera() {
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
    });
  }
  //카메라 종료
  function endCamera() {
    const s = videoRef.current.srcObject;
    s.getTracks().forEach((track) => {
      track.stop();
    });
    cameraEvent(false);
  }
  //촬영
  function snapShot() {
    //비디오 크기에 맞는 캔버스 사용
    canvasRef.current.width = VIDEO_RESULT_WIDTH;
    canvasRef.current.height = VIDEO_RESULT_HEIGHT;

    //캔버스에 비디오 화면 잘라서 그리기
    //비디오 화면을 중앙을 기준으로 좌우 180만큼 잘라낸다.
    //결과적으로 중앙에서 360의 가로, 640의 세로 영역을 잘라낸다.
    canvasRef.current
      .getContext("2d")
      .drawImage(
        videoRef.current,
        videoRef.current.videoWidth / 2 - VIDEO_RESULT_WIDTH / 2,
        0,
        VIDEO_RESULT_WIDTH,
        VIDEO_RESULT_HEIGHT,
        0,
        0,
        VIDEO_RESULT_WIDTH,
        VIDEO_RESULT_HEIGHT
      );

    //270도 회전하기
    canvasRef2.current.width = canvasRef.current.height;
    canvasRef2.current.height = canvasRef.current.width;

    canvasRef2.current.getContext("2d").rotate((270 * Math.PI) / 180);
    canvasRef2.current
      .getContext("2d")
      .drawImage(canvasRef.current, canvasRef.current.width * -1, 0);

    //캔버스의 값을 이미지화
    setOriImgSrc(canvasRef2.current.toDataURL("image/webp"));
    endCamera();
  }

  return (
    <Back>
      <div>
        <StyledCanvas ref={canvasRef}></StyledCanvas>
        <StyledCanvas ref={canvasRef2}></StyledCanvas>
        <StyledCamera>
          <StyledVideo ref={videoRef} autoPlay playsInline></StyledVideo>
          <StyledBtn onClick={snapShot}>사진촬영</StyledBtn>
        </StyledCamera>
      </div>
    </Back>
  );
}
