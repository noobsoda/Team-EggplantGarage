import { OpenVidu } from "openvidu-browser";
import React, { useState, useCallback, useEffect } from "react";
import UserVideoComponent from "../Atoms/Video/LiveVideo";
import { getToken } from "../util/api/liveApi";
import { useNavigate } from "react-router-dom";

export default function LiveShowSeller({ hostSessionId }) {
  //해당 세션 아이디를 받아서 해당 라이브로 접속하기
  //seller는 방송하기를 위한 카메라세팅, 카메라 접근권한이 필요하다.

  hostSessionId = "SessionA";

  const navigate = useNavigate();

  const [myUserName, setMyUserName] = useState("참가자");
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);

  const [OV, setTestOV] = useState(new OpenVidu());
  const leaveSession = useCallback(() => {
    // --- 7) 세션에서 나옴
    console.log("나옴");
    const mySession = session;
    console.log(mySession);
    if (mySession) {
      mySession.disconnect();
    }
    // Empty all properties...
    setSubscribers([]);
    setMainStreamManager(undefined);
  }, [session]);
  useEffect(() => {
    const onbeforeunload = (event) => {
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
      console.log("스트림 생성이요");
      var subscriber = mySession.subscribe(event.stream, undefined);
      var mySubscribers = subscribers;
      mySubscribers.push(subscriber);

      console.log("--------------서브스크라이버 추가요~");
      console.log(mySubscribers);

      setSubscribers(mySubscribers);
    });

    // On every Stream destroyed...
    mySession.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      console.log("나갔다.");
      console.log(event.stream.streamManager);
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    mySession.on("exception", (exception) => {
      console.log("예외요");
      console.warn(exception);
    });

    // --- 4) 토큰을 받아서 연결을 한다.
    getToken(hostSessionId).then((token) => {
      mySession
        .connect(token, { clientData: myUserName }) //해당 토큰을 가지고 유저명과 함께 연결을 진행
        .then(async () => {
          // --- 5) Get your own camera stream ---
          console.log("토큰 받음");
          console.log(token);

          //퍼블리셔의 정보
          let publisher = await OV.initPublisherAsync(undefined, {
            //audioSource: undefined, // The source of audio. If undefined default microphone
            //videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: false, // Whether you want to start publishing with your video enabled or not
            //resolution: "640x480", // The resolution of your video
            //frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            //mirror: false, // Whether to mirror your local video or not
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
          <div key={i} className="stream-container col-md-6 col-xs-6">
            {getNicknameTag(sub)}
            <UserVideoComponent streamManager={sub} />
          </div>
        ))}
    </div>
  );
}
