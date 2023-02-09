import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "../../Atoms/Video/LiveVideo";
import { getToken, closeSession } from "../../util/api/liveApi";

export default function LiveShowSeller({ liveId }) {
  //해당 세션 아이디를 받아서 해당 라이브로 접속하기
  //seller는 방송하기를 위한 카메라세팅, 카메라 접근권한이 필요하다.

  const navigate = useNavigate();

  const [myUserName] = useState("참가자");
  const [session, setSession] = useState(undefined);
  const [, setMainStreamManager] = useState(undefined); // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
  const [subscribers, setSubscribers] = useState([]);

  const [OV] = useState(new OpenVidu());
  const leaveSession = useCallback(() => {
    // --- 7) 세션에서 나옴
    const mySession = session;
    if (mySession) {
      mySession.disconnect();
    }
    // Empty all properties...
    setSubscribers([]);
    setMainStreamManager(undefined);
  }, [session]);
  useEffect(() => {
    const onbeforeunload = () => {
      leaveSession();
    };
    window.addEventListener("beforeunload", onbeforeunload); // componentDidMount
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, [leaveSession]);

  useEffect(() => {
    joinSession();
  }, []);

  function joinSession() {
    //const OVidu = new OpenVidu(); //오픈비두 생성
    // --- 2) Init a session ---
    let mySession = OV.initSession(); //세션 만들기 세션?
    setSession(mySession); //세션을미리 저장

    //스트림 생성
    mySession.on("streamCreated", (event) => {
      var subscriber = mySession.subscribe(event.stream, undefined);
      var mySubscribers = subscribers;

      //방송중 확인 필요

      mySubscribers.push(subscriber);

      setSubscribers(mySubscribers);
    });

    // On every Stream destroyed...
    mySession.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    // --- 4) 토큰을 받아서 연결을 한다.
    getToken(liveId, "SUBSCRIBER").then((token) => {
      mySession
        .connect(token, { clientData: myUserName }) //해당 토큰을 가지고 유저명과 함께 연결을 진행
        .then(async () => {
          // --- 5) Get your own camera stream ---

          //퍼블리셔의 정보
          let publisher = await OV.initPublisherAsync(undefined, {
            publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: false, // Whether you want to start publishing with your video enabled or not
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
          });

          // --- 6)
          mySession.publish(publisher);

          setMainStreamManager(publisher);
        })
        .catch((error) => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    });
  }

  //참가자 배열에서 제거
  const deleteSubscriber = useCallback(
    (streamManager) => {
      let tmp_subscribers = subscribers;
      let index = tmp_subscribers.indexOf(streamManager, 0);
      if (index > -1) {
        tmp_subscribers.splice(index, 1);
        setSubscribers(tmp_subscribers);
      }
      if (getNicknameTag(streamManager) === "admin") {
        alert("방송이 종료되었습니다.");
        navigate("/home");
      }
    },
    [subscribers, navigate]
  );

  function getNicknameTag(streamManager) {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  }

  return (
    <div>
      {subscribers
        .filter((sub) => getNicknameTag(sub) === "admin")
        .map((sub, i) => (
          <div key={i}>
            <UserVideoComponent streamManager={sub} />
          </div>
        ))}
    </div>
  );
}
