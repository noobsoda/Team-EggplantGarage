import { OpenVidu } from "openvidu-browser";
import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserVideoComponent from "../Atoms/Video/LiveVideo";
import { getToken } from "../util/api/liveApi";

export default function LiveShowSeller() {
  const { sessionId } = useParams(); //방 아이디

  const [myUserName] = useState("admin"); //방생성한 사람 이름
  const [session, setSession] = useState(undefined);
  const [, setMainStreamManager] = useState(undefined); // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [, setCurrentVideoDevice] = useState(undefined);

  const [OV] = useState(new OpenVidu());

  useEffect(() => {
    //판매자가 방 생성
    joinSession();
  }, []);

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

  function joinSession() {
    //const OVidu = new OpenVidu(); //오픈비두 생성
    // --- 2) Init a session ---
    let mySession = OV.initSession(); //세션 만들기 세션?
    setSession(mySession); //세션을미리 저장

    //스트림 생성
    mySession.on("streamCreated", (event) => {
      var subscriber = mySession.subscribe(event.stream, undefined);
      var mySubscribers = subscribers;

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
    getToken(sessionId).then((token) => {
      mySession
        .connect(token, { clientData: myUserName }) //해당 토큰을 가지고 유저명과 함께 연결을 진행
        .then(async () => {
          // --- 5) 카메라 세팅 ---

          //퍼블리셔의 정보
          let publisher = await OV.initPublisherAsync(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: "1280x720", // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          });

          // --- 6)
          //판매자가 방송 시작
          mySession.publish(publisher);

          // 장비를 받는다.
          var devices = await OV.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          //현재 판매자의 방송 장비를 확인
          var currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          var currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

          // 퍼블리셔 설정
          setCurrentVideoDevice(currentVideoDevice);
          setPublisher(publisher);
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
        setSubscribers(tmp_subscribers); // 이거 안 되면 구조분해할당으로 업데이트 할 것
      }
    },
    [subscribers]
  );
  // async function switchCamera() {
  //   try {
  //     const devices = await OV.getDevices();
  //     var videoDevices = devices.filter(
  //       (device) => device.kind === "videoinput"
  //     );

  //     if (videoDevices && videoDevices.length > 1) {
  //       var newVideoDevice = videoDevices.filter(
  //         (device) => device.deviceId !== currentVideoDevice.deviceId
  //       );

  //       if (newVideoDevice.length > 0) {
  //         // Creating a new publisher with specific videoSource
  //         // In mobile devices the default and first camera is the front one
  //         var newPublisher = OV.initPublisher(undefined, {
  //           videoSource: newVideoDevice[0].deviceId,
  //           publishAudio: true,
  //           publishVideo: true,
  //           mirror: true,
  //         });

  //         //newPublisher.once("accessAllowed", () => {
  //         await session.unpublish(mainStreamManager);

  //         await session.publish(newPublisher);
  //         setCurrentVideoDevice(newVideoDevice[0]);
  //         setMainStreamManager(newPublisher);
  //         setPublisher(newPublisher);
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  function getNicknameTag(streamManager) {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  }

  return (
    <div className="container">
      <UserVideoComponent streamManager={publisher} />
    </div>
  );
}
