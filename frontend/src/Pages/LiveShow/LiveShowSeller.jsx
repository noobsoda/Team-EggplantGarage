import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import ModalSeller from "../../Organisms/Modal/ModalBuyer";
import LiveChatBox from "../../Molecules/Box/LiveChatBox";
import BigMenuBtn from "../../Atoms/IconButtons/liveshow/BigMenuBtn";
import MicBtn from "../../Atoms/IconButtons/liveshow/MicBtn";
import CameraBtn from "../../Atoms/IconButtons/liveshow/CameraBtn";
import FlipBtn from "../../Atoms/IconButtons/liveshow/FlipBtn";
import ExitBtn from "../../Atoms/IconButtons/liveshow/ExitBtn";
import { closeLive } from "../../util/api/liveApi";

import Seller from "../../Templates/LiveShow/Seller";

import { getLiveDetail } from "../../util/api/liveApi";
import { getSellerSuggestList } from "../../util/api/productApi";

import useInterval from "../../hook/useInterval";
import ViewerCntBox from "../../Molecules/Box/ViewerCntBox";

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
export default function LiveshowBuyer(toggleCamera) {
  const { liveId } = useParams(); //방 아이디

  const [isMic, setIsMic] = useState(true);
  const [isCamera, setIsCamera] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [liveInfo, setLiveInfo] = useState({});
  const [bundleList, setBundleList] = useState([]);
  // const [isExit, setIsExit] = useState(false);

  const navigate = useNavigate();

  const exit = () => {
    // if (isExit) {
    closeLive(liveId, (data) => {});
    navigate("/");
    // }
  };

  //10초마다 묶음 제안 요청 왔는지 확인
  useInterval(() => {
    getSuggest();
  }, 10000);

  function getSuggest() {
    getSellerSuggestList(
      liveId,
      ({ data }) => {
        setBundleList(data);
      },
      () => {
        console.warn("bundle load fail");
      }
    );
  }

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
      <Seller
        liveId={liveId}
        isCamera={isCamera}
        isMic={isMic}
        isFlipped={isFlipped}
      />
      <LiveLayout>
        <StyledHeader>
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "16px" }}
          >
            <Title className="show-header">{liveInfo.title}</Title>
            <ViewerCntBox
              viewerCnt={
                liveInfo.userEntryResList && liveInfo.userEntryResList.length
              }
            />
          </div>
          <StyledSide>
            <BigMenuBtn
              buttonClick={() => {
                setModalOpen(true);
              }}
            />
            <div>　</div>
            <FlipBtn
              buttonClick={() => {
                setIsFlipped((cur) => !cur);
              }}
            />
            <CameraBtn
              buttonClick={() => {
                setIsCamera((cur) => !cur);
              }}
              isClicked={!isCamera}
            />
            <MicBtn
              buttonClick={() => {
                setIsMic((cur) => !cur);
              }}
              isClicked={!isMic}
            />
            <ExitBtn
              buttonClick={() => {
                // setIsExit(true);
                // console.log(isExit);
                exit();
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
          getSuggest={getSuggest}
        />
      )}
    </StyledPage>
  );
}
