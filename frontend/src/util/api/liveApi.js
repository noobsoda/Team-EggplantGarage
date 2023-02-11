import { api, fileApi, OVApi } from "./api";
/**
 * 세션에서 토큰 가져오기
 * @param {*} hostSessionId
 * @returns
 */
async function getToken(hostSessionId, role) {
  //sessionid생성
  const sessionId = await createSession(hostSessionId);
  //sessionid로 토큰 생성
  return await createToken(sessionId, role);
}

async function createSession(sessionId) {
  let data = { customSessionId: sessionId };
  const response = await OVApi.post("/openvidu/api/sessions", data)
    .then(({ data }) => {
      return data.id;
    })
    .catch((e) => {
      var error = Object.assign({}, e);
      if (error?.response?.status === 409) {
        return sessionId;
      }
    });
  return response;
}

/**
 *
 * @param {*} sessionId
 * @param {*} role  PUBLISHER , SUBSCRIBER
 * @returns
 */
async function createToken(sessionId, role) {
  //role
  const data = { role: role };
  const response = await OVApi.post(
    "/openvidu/api/sessions/" + sessionId + "/connection",
    data
  ).catch((e) => {
    console.log(e);
  });
  return response.data.token; // The token
}

async function closeSession(sessionId) {
  const response = await OVApi.delete("/openvidu/api/sessions/" + sessionId)
    .then(({ data }) => {
      return data.id;
    })
    .catch((e) => {
      var error = Object.assign({}, e);
      if (error?.response?.status === 409) {
        return sessionId;
      }
    });
  return response;
}
////////////////////////////////////////////////////////////

// /**
//  * 모든 live 조회
//  */
// async function getAllLives(success, fail) {
//   const lives = await api.get(`/api/v1/lives`).then(success);
//   // .catch();
//   return lives;
// }

async function getLives(searchCondition, success, fail) {
  const lives = await api
    .post(`/api/v1/lives/search`, searchCondition)
    .then(success);
  return lives;
}

/**
 * 마이페이지 내 판매내역 클릭시 나올 했던 라이브 목록들 가져오기
 * @param {*} success 성공시 콜백함수
 * @param {*} fail 
 * @param {*} myid 내아이디
 * @returns "createdAt": "2023-02-06T03:35:57.082Z",
    "liveId": 0,
    "thumbnailUrl": "string",
    "title": "string"
 */
async function getMyLives(myId, success, fail) {
  const lives = await api.get(`/api/v1/lives`).then(success);
  // .catch();
  return lives;
}

/**
 * 판매내역 라이브중 하나 클릭시 상세보기에 나올 lives 들
 * @param {*} success
 * @param {*} fail
 * @param {*} sessionId detail 들어갈 sessionId requestBody 객체로 보내줌.
 * @returns
 * "categories": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "createAt": "2023-02-06T04:00:37.944Z",
  "description": "string",
  "id": 0,
  "live": true,
  "liveProductInfoList": [
    {
      "buyerId": 0,
      "creatAt": "2023-02-06T04:00:37.944Z",
      "id": 0,
      "imageUrl": "string",
      "initialPrice": 0,
      "leftTopX": 0,
      "leftTopY": 0,
      "liveId": 0,
      "name": "string",
      "paid": true,
      "rightBottomX": 0,
      "rightBottomY": 0,
      "sellerId": 0,
      "soldAt": "2023-02-06T04:00:37.944Z",
      "soldPrice": 0
    }
  ],
  "seller_id": 0,
  "seller_nickname": "string",
  "thumbnailUrl": "string",
  "title": "string",
  "userEntryResList": [
    {
      "id": 0,
      "nickname": "string"
    }
  ]
 */
// async function getLiveDetails(sessionId, success, fail) {
//   const live = await api.get(`/api/v1/lives`, sessionId).then(success);
//   // .catch();
//   return live;
// }

/**
 * 라이브 시작하기
 * @param {*} data {title,description,url,live,latitude,longtitude, sessionId}
 * @param {*} success
 * @param {*} fail
 * @returns {*} {liveId:11}
 */
async function createLive(data, success, fail) {
  const lives = await api
    .post(`/api/v1/lives`, data, {
      // headers: {
      //   AUTHORIZATION: "Bearer " + sessionStorage.getItem("accessToken"),
      // },
    })
    .then(success)
    .catch(fail);
  return lives;
}

/**
 * 라이브 카테고리 설정
 * @param {*} data {liveId:11, liveCategoryReqList{ categoryName:""}}
 * @param {*} success
 * @param {*} fail
 */
async function setLiveCategory(data, success, fail) {
  return await api
    .post(`/api/v1/lives/category`, data)
    .then(success)
    .catch(fail);
}

/**
 * 라이브 썸네일 설정
 * @param {*} data {liveId:11,img:file}
 * @param {*} success
 * @param {*} fail
 * @returns
 */
async function setLiveImage(data, success, fail) {
  return await fileApi
    .post(`/api/v1/lives/save/img`, data)
    .then(success)
    .catch(fail);
}

/**
 * 라이브의 상세 정보 조회
 * 제목, 카테고리, 등록된 물품, 참여자,
 * @param {*} id 라이브의 방 번호 - liveid(pk)
 * @param {*} success
 * @param {*} fail
 * @returns
 */
async function getLiveDetail(id, success, fail) {
  console.log(id);
  return await api
    .post(`/api/v1/lives/detail`, { liveId: id })
    .then(success)
    .catch(fail);
}

/**
 * 라이브를 종료 시킨다 isLive = false
 * @param {*} id liveId pk
 */
async function closeLive(id, success, fail) {
  return await api.patch(`/api/v1/lives/${id}`).then(success).catch(fail);
}
async function getSalesHistory(sellerId, success, fail) {
  const lives = await api
    .get(`/api/v1/history/seller/` + sellerId)
    .then(success);
  return lives;
}
async function joinLive(joinReq, success, fail) {
  return await api
    .post(`/api/v1/lives/userlive`, joinReq)
    .then(success)
    .catch(fail);
}
//axios 통신 get or delete 할때 requestbody를 {data:body}로 감싸서 보내면 된다.
async function exitLive(exitReq, success, fail) {
  return await api
    .delete(`/api/v1/lives/userlive`, { data: exitReq })
    .then(success)
    .catch(fail);
}
export {
  getToken,
  closeSession,
  createLive,
  setLiveCategory,
  setLiveImage,
  getLiveDetail,
  closeLive,
  getMyLives,
  // getLiveDetails,
  getSalesHistory,
  getLives,
  joinLive,
  exitLive,
};
