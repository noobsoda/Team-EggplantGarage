import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkUserInfo } from "../../store/user";
import styled from "styled-components";

import LiveChatBox from "../../Molecules/Box/LiveChatBox";
import BigMenuBtn from "../../Atoms/IconButtons/liveshow/BigMenuBtn";
import SpeakerBtn from "../../Atoms/IconButtons/liveshow/SpeakerBtn";
import ExitBtn from "../../Atoms/IconButtons/liveshow/ExitBtn";
import LikeBtn from "../../Atoms/IconButtons/liveshow/LikeBtn";
import ViewerCntBox from "../../Molecules/Box/ViewerCntBox";

import ModalBuyer from "../../Organisms/Modal/ModalBuyer";

import Buyer from "../../Templates/LiveShow/Buyer";

import getStompClient from "../../util/socket";
import { getLiveDetail } from "../../util/api/liveApi";
import {
  isFavoriteLive,
  deleteFavoriteLive,
  addFavoriteLive,
} from "../../util/api/favoriteApi";
import { exitLive } from "../../util/api/liveApi";

import {
  getBuyerSuggestList,
  getBuyerSuggestListPayWait,
} from "../../util/api/productApi";

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
const LiveLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
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
export default function LiveshowBuyer() {
  const navigate = useNavigate();
  const { liveId } = useParams(); //방 아이디가 넘어온다.
  const userInfo = useSelector(checkUserInfo); //현재 유저의 정보

  const [stompClient] = useState(getStompClient()); //소켓

  const [liveInfo, setLiveInfo] = useState({}); //방의 정보, 판매물품
  const [isSpeaker, setIsSpeaker] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [bundleList, setBundleList] = useState([]);
  const [payList, setPayList] = useState([]);

  //종료 여부
  const [isExit, setIsExit] = useState(false);

  //메시지
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState(""); // 입력 메세지

  useEffect(() => {
    getLiveDetail(
      liveId,
      ({ data }) => {
        //라이브 중인지 확인
        if (!data.live) {
          alert("종료된 방입니다.");
          navigate("/");
          return;
        }
        setLiveInfo(data);
      },
      () => {
        console.warn("live info fail");
      }
    );
    // //현재 유저의 좋아요 유무
    isFavoriteLive(
      { liveId: liveId, userId: userInfo.id },
      ({ data }) => {
        setIsLiked(data.favorite);
      },
      () => {
        console.warn("favor info fail");
      }
    );
    connect();
  }, []);

  //10초마다 묶음 제안 요청 왔는지 확인
  useInterval(() => {
    getSuggest();
    getApprovSuggest();
  }, 10000);

  //10초마다 방정보 확인
  useInterval(() => {
    getLiveDetail(
      liveId,
      ({ data }) => {
        setLiveInfo(data);
      },
      () => {
        console.warn("live info fail");
      }
    );
  }, 10000);

  //라이브 나가기
  const exit = () => {
    const exitReq = { userId: userInfo.id, liveId: liveId };
    exitLive(exitReq, () => {
      setIsExit(true);
      navigate("/");
    });
  };

  //묶음 제안 확인
  function getSuggest() {
    getBuyerSuggestList(
      liveId,
      userInfo.id,
      ({ data }) => {
        setBundleList(data);
      },
      () => {
        console.warn("bundle load fail");
      }
    );
  }

  //승인된것 확인-결제 대기
  function getApprovSuggest() {
    getBuyerSuggestListPayWait(
      liveId,
      userInfo.id,
      ({ data }) => {
        setPayList(data);
      },
      () => {
        console.warn("pay load fail");
      }
    );
  }

  //좋아요 클릭
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

  //** 소켓 관련
  //연결
  const connect = () => {
    stompClient.connect({}, connectSuccess, connectError);
  };
  /**
   * 연결 성공
   */
  const connectSuccess = () => {
    stompClient.subscribe("/sub/live/" + liveId, onMessageReceived);
    stompClient.send(
      "/pub/live/addUser/" + liveId,
      {},
      JSON.stringify({
        sender: userInfo.nickname,
        type: "JOIN",
        roomId: liveId,
      })
    );
  };

  /**
   * 연결 실패
   */
  const connectError = () => {
    console.warn("connectError!");
  };

  /**
   * 메시지 받음
   * @param {*} payload
   */
  const onMessageReceived = (payload) => {
    const messageRecv = JSON.parse(payload.body);
    let color = "";
    if (messageRecv.type === "JOIN") {
      setMessageList((prevItems) => [
        ...prevItems,
        {
          color: "white",
          content: "[" + messageRecv.sender + "] 님이 입장하셨습니다.",
        },
      ]);
    } else {
      //REJECT, ACCEP,PAY,SUGGEST, CHAT
      switch (messageRecv.type) {
        case "REJECT":
          color = "red";
          break;
        case "ACCEPT":
          color = "green";
          break;
        case "PAY":
          color = "green";
          break;
        case "SUGGEST":
          color = "purple";
          break;
        default:
          color = "white";
          break;
      }

      setMessageList((prevItems) => [
        ...prevItems,
        {
          color: color,
          content: `[${
            messageRecv.type === "CHAT" ? messageRecv.sender : "INFO"
          }] ${messageRecv.content}`,
        },
      ]);
    }
  };

  /**
   * 메시지 전송
   */
  const sendMessage = (msg, type) => {
    if (msg && stompClient) {
      var chatMessage = {
        sender: userInfo.nickname,
        roomId: liveId,
        content: msg,
        type: type, //"CHAT",
      };
      stompClient.send(
        "/pub/live/message/" + liveId,
        {},
        JSON.stringify(chatMessage)
      );
    }
    setMessage("");
  };

  //채팅 입력
  const chatMessage = () => {
    sendMessage(message, "CHAT");
    setMessage("");
  };

  return (
    <StyledPage>
      <Buyer liveId={liveId} exit={exit} isExit={isExit} />
      <LiveLayout>
        <StyledHeader>
          <div
            style={{ display: "flex", flexDirection: "column", rowGap: "16px" }}
          >
            <Title className="show-header">{liveInfo.title}</Title>
            <div className="body1-header" style={{ color: "white" }}>
              판매자 {liveInfo.seller_nickname} 님
            </div>
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
            <LikeBtn buttonClick={clickLike} isClicked={isLiked} />
            <SpeakerBtn
              buttonClick={() => {
                setIsSpeaker((cur) => !cur);
              }}
              isClicked={isSpeaker}
            />
            <ExitBtn
              buttonClick={() => {
                exit();
              }}
            />
          </StyledSide>
        </StyledHeader>
        <StyledBody>
          <LiveChatBox
            message={message}
            setMessage={setMessage}
            messageList={messageList}
            sendMessage={chatMessage}
            stompClient={stompClient}
          />
        </StyledBody>
      </LiveLayout>
      {modalOpen && (
        <ModalBuyer
          // userId={userInfo.id}
          userInfo={userInfo}
          liveId={liveId}
          bundleList={bundleList}
          productList={liveInfo.liveProductInfoList}
          setModalOpen={setModalOpen}
          isSeller={false}
          getSuggest={getSuggest}
          payList={payList}
          getApprovSuggest={getApprovSuggest}
          sendMessage={sendMessage}
        />
      )}
    </StyledPage>
  );
}
