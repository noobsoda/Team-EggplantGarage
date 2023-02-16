import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkUserInfo } from "../../store/user";

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

import getStompClient from "../../util/socket";

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
export default function LiveshowSeller(toggleCamera) {
  const { liveId } = useParams(); //방 아이디
  const userInfo = useSelector(checkUserInfo); //현재 유저의 정보

  const [isMic, setIsMic] = useState(true);
  const [isCamera, setIsCamera] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [liveInfo, setLiveInfo] = useState({});
  const [bundleList, setBundleList] = useState([]);

  //소켓
  const [stompClient] = useState(getStompClient()); //소켓
  //메시지
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState(""); // 입력 메세지

  //종료 여부
  const [isExit, setIsExit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getLiveInfo();
    getSuggest();
    connect();
  }, []);

  function getLiveInfo() {
    getLiveDetail(
      liveId,
      ({ data }) => {
        //라이브 중인지 확인
        if (!data.live) {
          alert("종료된 방입니다.");
          navigate("/");
          return;
        }

        //내가 주인인지 확인
        if (data.seller_id !== userInfo.id) {
          alert("잘못된 접근입니다.");
          navigate("/");
          return;
        }
        setLiveInfo(data);
      },
      () => {
        console.warn("live info fail");
      }
    );
  }

  const exit = () => {
    closeLive(liveId, () => {
      setIsExit(true);
      navigate("/");
    });
  };

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
    if (messageRecv.type === "JOIN") {
      getLiveInfo();
      setMessageList((prevItems) => [
        ...prevItems,
        {
          color: "white",
          content: "[" + messageRecv.sender + "] 님이 입장하셨습니다.",
        },
      ]);
    } else {
      //REJECT, ACCEP,PAY,SUGGEST, CHAT
      let color = "";
      switch (messageRecv.type) {
        case "REJECT":
          getSuggest();
          color = "red";
          break;
        case "ACCEPT":
          getSuggest();
          getLiveInfo();
          color = "green";
          break;
        case "PAY":
          getLiveInfo();
          color = "green";
          break;
        case "SUGGEST":
          getSuggest();
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
        type: type,
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
      <Seller
        liveId={liveId}
        isCamera={isCamera}
        isMic={isMic}
        isFlipped={isFlipped}
        exit={exit}
        isExit={isExit}
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
        <ModalSeller
          sendMessage={sendMessage}
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
