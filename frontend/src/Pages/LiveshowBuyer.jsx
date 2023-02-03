import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ModalBuyer from "../Templates/Modal/ModalBuyer";
import LiveChatting from "../Molecules/LiveChatting";
import ChatInput from "../Atoms/Inputs/ChatInput";

const StyledPage = styled.div`
  width: 360px;
  height: 100vh;
  background-color: grey;
`;
//일단은 컴포넌트들이랑 바텀시트 구현해놓자.
const StyledSide = styled.div`
  width: 40px;
  position: absolute;
  left: 304px;
  top: 24px;
  z-index: 1;
`;
const MenuBtn = styled.button`
  width: 40px;
  height: 40px;
  margin-bottom: 40px;
  background: url("/image/liveshow/bigmenu-icon.svg") no-repeat 0px 0px;
`;
const CameraBtn = styled.button`
  width: 40px;
  height: 40px;
  margin-bottom: 16px;
  background: url("/image/liveshow/camera-icon.svg") no-repeat 0px 0px;
`;
const CameraBtnT = styled.button`
  width: 40px;
  height: 40px;
  margin-bottom: 16px;
  background: url("/image/liveshow/camera-icon.svg") no-repeat 0px 0px;
  background-position-y: -40px;
`;
const MicBtn = styled.button`
  width: 40px;
  height: 40px;
  margin-bottom: 16px;
  background: url("/image/liveshow/mic-icon.svg") no-repeat 0px 0px;
`;
const MicBtnT = styled.button`
  width: 40px;
  height: 40px;
  margin-bottom: 16px;
  background: url("/image/liveshow/mic-icon.svg") no-repeat 0px 0px;
  background-position-y: -40px;
`;
const SpeakerBtn = styled.button`
  width: 40px;
  height: 40px;
  margin-bottom: 16px;

  background: url("/image/liveshow/speaker-icon.svg") no-repeat 0px 0px;
`;
const SpeakerBtnT = styled.button`
  width: 40px;
  height: 40px;
  margin-bottom: 16px;
  background: url("/image/liveshow/speaker-icon.svg") no-repeat 0px 0px;
  background-position-y: -40px;
`;
const ExitBtn = styled.button`
  width: 40px;
  height: 40px;
  margin-bottom: 16px;

  background: url("/image/liveshow/exit-icon.svg") no-repeat 0px 0px;
`;
const SendBtn = styled.button`
  width: 24px;
  height: 24px;
  background: url("/image/liveshow/send-icon.svg") no-repeat 0px 0px;
`;

export default function LiveshowBuyer() {
  const [isCamera, setIsCamera] = useState(true);
  const [isMic, setIsMic] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <StyledPage>
      야호 여기 구매자페이지
      <StyledSide>
        <MenuBtn
          onClick={() => {
            setModalOpen(true);
          }}
        />
        {isCamera ? (
          <CameraBtn
            onClick={() => {
              setIsCamera(false);
            }}
          />
        ) : (
          <CameraBtnT
            onClick={() => {
              setIsCamera(true);
            }}
          />
        )}
        {isMic ? (
          <MicBtn
            onClick={() => {
              setIsMic(false);
            }}
          />
        ) : (
          <MicBtnT
            onClick={() => {
              setIsMic(true);
            }}
          />
        )}
        <ExitBtn
          onClick={() => {
            navigate("/");
          }}
        />
      </StyledSide>
      <LiveChatting />
      <ChatInput />
      {modalOpen && <ModalBuyer setModalOpen={setModalOpen} />}
    </StyledPage>
  );
}
