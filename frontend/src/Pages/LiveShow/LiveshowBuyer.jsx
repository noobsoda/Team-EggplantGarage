import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkUserInfo } from "../../store/user";
import styled from "styled-components";

import ChatInput from "../../Atoms/Inputs/ChatInput";
import BigMenuBtn from "../../Atoms/IconButtons/liveshow/BigMenuBtn";
import SpeakerBtn from "../../Atoms/IconButtons/liveshow/SpeakerBtn";
import ExitBtn from "../../Atoms/IconButtons/liveshow/ExitBtn";
import LikeBtn from "../../Atoms/IconButtons/liveshow/LikeBtn";

import ModalBuyer from "../../Organisms/Modal/ModalBuyer";

import Buyer from "../../Templates/LiveShow/Buyer";

import { getLiveDetail } from "../../util/api/liveApi";
import {
  isFavoriteLive,
  deleteFavoriteLive,
  addFavoriteLive,
} from "../../util/api/favoriteApi";

const StyledPage = styled.div`
  width: 100%;
  height: 100%;
  background-color: grey;
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
  height: calc(100% - 328px);
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
export default function LiveshowBuyer() {
  const navigate = useNavigate();
  const { liveId } = useParams(); //방 아이디가 넘어온다.
  const userInfo = useSelector(checkUserInfo); //현재 유저의 정보

  const [liveInfo, setLiveInfo] = useState({});
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    console.log(liveId);
    getLiveDetail(
      liveId,
      ({ data }) => {
        setLiveInfo(data);
      },
      () => {
        console.warn("live info fail");
      }
    );
    // //현재 유저의 좋야요 유무
    isFavoriteLive(
      { liveId: liveId, userId: userInfo.id },
      ({ data }) => {
        setIsLiked(data);
      },
      () => {
        console.warn("favor info fail");
      }
    );
  }, []);

  function clickLike() {
    if (isLiked) {
      deleteFavoriteLive(
        { liveId: liveId, userId: userInfo.id },
        () => {},
        () => {
          console.warn("favor delete fail");
        }
      );
    } else {
      addFavoriteLive(
        { liveId: liveId, userId: userInfo.id },
        () => {},
        () => {
          console.warn("favor add fail");
        }
      );
    }
    setIsLiked(!isLiked);
  }
  return (
    <StyledPage>
      <Buyer liveId={liveId} />
      <StyledHeader>
        <Title className="show-header">{liveInfo.title}</Title>
        <StyledSide>
          <BigMenuBtn
            buttonClick={() => {
              setModalOpen(true);
            }}
          />
          <div>　</div>
          <LikeBtn buttonClick={clickLike} isClicked={isLiked} />
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
        <ChatInput />
      </StyledBody>
      {modalOpen && <ModalBuyer setModalOpen={setModalOpen} />}
    </StyledPage>
  );
}
