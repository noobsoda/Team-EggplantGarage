import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Button from "../Atoms/Buttons/ExtraSmallBtn";

const StyledCanvas = styled.canvas`
  display: none;
`;
const StyledImg = styled.img`
  width: 360px;
`;

const StyledCamera = styled.div`
  position: absolute;
  top: 0;
  width: 360px;
  height: 640px;
  display: flex;
  justify-content: center;
`;
const StyledVideo = styled.video`
  height: 640px;
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
  position: fixed;
  bottom: 30px;
`;

//카메라 설정
const getWebcam = (callback) => {
  try {
    const constraints = {
      video: true,
      audio: false,
    };
    navigator.mediaDevices.getUserMedia(constraints).then(callback);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export default function PictureBox() {
  const videoRef = useRef(null); //비디오 태그
  const canvasRef = useRef(null); //비디오를 담는 canvas
  const canvasRef2 = useRef(null); //회전후 결과를 담는 canvas
  const [playing, setPlaying] = useState(false); //촬영모드 on,off
  const [imgSrc, setImgSrc] = useState("//:0");

  useEffect(() => {
    getWebcam((stream) => {
      setPlaying(true);
      videoRef.current.srcObject = stream;
      setPlaying(false);
    });
  }, []);

  const startOrStop = () => {
    if (playing) {
      const s = videoRef.current.srcObject;
      s.getTracks().forEach((track) => {
        track.stop();
      });
    } else {
      getWebcam((stream) => {
        setPlaying(true);
        videoRef.current.srcObject = stream;
      });
    }
    setPlaying(!playing);
  };

  //촬영
  function snapShot() {
    //비디오 크기에 맞는 캔버스 사용
    canvasRef.current.width = 360;
    canvasRef.current.height = videoRef.current.videoHeight;

    //캔버스에 비디오 화면 잘라서 그리기
    canvasRef.current
      .getContext("2d")
      .drawImage(
        videoRef.current,
        videoRef.current.videoWidth / 2 - 180,
        0,
        360,
        640,
        0,
        0,
        360,
        640
      );

    //270도 회전하기
    canvasRef2.current.width = canvasRef.current.height;
    canvasRef2.current.height = canvasRef.current.width;

    canvasRef2.current.getContext("2d").rotate((270 * Math.PI) / 180);
    canvasRef2.current
      .getContext("2d")
      .drawImage(canvasRef.current, canvasRef.current.width * -1, 0);

    //캔버스의 값을 이미지화
    setImgSrc(canvasRef2.current.toDataURL("image/webp"));

    startOrStop(); //촬영 정지
  }

  return (
    <div>
      <h2 className="body1-header">사진 등록</h2>

      <div>
        <Button name="카메라" buttonClick={startOrStop} />
        <Button name="앨범" />
      </div>
      <StyledCanvas ref={canvasRef}></StyledCanvas>
      <StyledCanvas ref={canvasRef2}></StyledCanvas>
      <StyledImg src={imgSrc} alt="" />
      {playing ? (
        <StyledCamera>
          <StyledVideo ref={videoRef} autoPlay playsInline></StyledVideo>
          <StyledBtn onClick={snapShot}>사진촬영</StyledBtn>
        </StyledCamera>
      ) : (
        <></>
      )}
    </div>
  );
}
