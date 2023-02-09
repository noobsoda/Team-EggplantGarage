import React from "react";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import ModalSeller from "../../Organisms/Modal/ModalBuyer";
import LiveChatBox from "../../Molecules/Box/LiveChatBox";
import BigMenuBtn from "../../Atoms/IconButtons/liveshow/BigMenuBtn";
import SpeakerBtn from "../../Atoms/IconButtons/liveshow/SpeakerBtn";
import ExitBtn from "../../Atoms/IconButtons/liveshow/ExitBtn";
import { closeLive } from "../../util/api/liveApi";

import Seller from "../../Templates/LiveShow/Seller";

import { getLiveDetail } from "../../util/api/liveApi";
import { getLiveBundle } from "../../util/api/productApi";

import useInterval from "../../hook/useInterval";

const StyledPage = styled.div`
  width: 100%;
  height: 100%;
  background-color: grey;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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
  height: 50%;
  width: 100%;
  //264+ padding값
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  row-gap: 24px;
  position: absolute;
  bottom: 0;
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
  const { liveId } = useParams(); //방 아이디

  const [isSpeaker, setIsSpeaker] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [liveInfo, setLiveInfo] = useState({});
  const [bundleList, setBundleList] = useState([]);

  const navigate = useNavigate();

  const exit = () => {
    closeLive(liveId, (data) => {
      console.log(data);
    });
  };

  //10초마다 묶음 제안 요청 왔는지 확인
  useInterval(() => {
    getLiveBundle(
      liveId,
      ({ data }) => {
        console.log("제안온 목록");
        console.log(data);
        setBundleList(data);
      },
      () => {
        console.warn("bundle load fail");
      }
    );
  }, 10000);

  useEffect(() => {
    getLiveDetail(
      liveId,
      ({ data }) => {
        setLiveInfo(data);
      },
      () => {
        console.warn("live info fail");
      }
    );
  }, []);

  return (
    <StyledPage>
      <Seller liveId={liveId} />
      <LiveLayout>
        <StyledHeader>
          <Title className="show-header">{liveInfo.title}</Title>
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
                exit();
                navigate("/");
              }}
            />
          </StyledSide>
        </StyledHeader>
        <StyledBody>
          <LiveChatBox liveId={liveId} />
        </StyledBody>
      </LiveLayout>

      {modalOpen && (
        <ModalSeller
          productList={liveInfo.liveProductInfoList}
          bundleList={bundleList}
          setModalOpen={setModalOpen}
          isSeller={true}
        />
      )}
    </StyledPage>
  );
}
