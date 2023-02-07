import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import ModalBuyer from "../../Organisms/Modal/ModalBuyer";
import LiveChatting from "../../Molecules/Box/LiveChatting";
import ChatInput from "../../Atoms/Inputs/ChatInput";
import BigMenuBtn from "../../Atoms/IconButtons/liveshow/BigMenuBtn";
import SpeakerBtn from "../../Atoms/IconButtons/liveshow/SpeakerBtn";
import ExitBtn from "../../Atoms/IconButtons/liveshow/ExitBtn";

import Seller from "../../Templates/LiveShow/Seller";

import { getLiveDetail } from "../../util/api/liveApi";

const StyledPage = styled.div`
  width: 100%;
  height: 100%;
  background-color: grey;
  position: relative;
`;
//일단은 컴포넌트들이랑 바텀시트 구현해놓자.
const StyledSide = styled.div`
  width: 40px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;
const StyledHeader = styled.div`
  width: calc(100% - 48px);
  padding: 40px 24px;
  display: flex;
  justify-content: space-between;
`;
const StyledBody = styled.div`
  height: calc(100% - 288px);
  //264+ padding값
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  row-gap: 24px;
`;
const Title = styled.div`
  color: white;
`;
const LiveLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
export default function LiveshowBuyer() {
  const { sessionId } = useParams(); //방 아이디

  const [isSpeaker, setIsSpeaker] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [liveInfo, setLiveInfo] = useState({});

  useEffect(() => {
    getLiveDetail(
      sessionId,
      ({ data }) => {
        console.log(data);
      },
      () => {}
    );
  }, []);

  const navigate = useNavigate();
  return (
    <StyledPage>
      <Seller sessionId={sessionId} />
      <LiveLayout>
        <StyledHeader>
          <Title className="show-header">라이브쇼 제목</Title>
          <StyledSide>
            <BigMenuBtn
              buttonClick={() => {
                setModalOpen(true);
              }}
            />
            <div>　</div>
            <SpeakerBtn
              buttonClick={() => {
                setIsSpeaker((cur) => !cur);
              }}
              isClicked={isSpeaker}
            />
            <ExitBtn
              buttonClick={() => {
                navigate("/");
              }}
            />
          </StyledSide>
        </StyledHeader>
        <StyledBody>
          <LiveChatting />
          <ChatInput />
        </StyledBody>
      </LiveLayout>

      {modalOpen && <ModalBuyer setModalOpen={setModalOpen} />}
    </StyledPage>
  );
}
