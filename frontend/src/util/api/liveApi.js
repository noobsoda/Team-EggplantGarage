import { OVApi } from "./api";
import { api } from "./api";
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

/**
 * 모든 live 조회
 */
async function getAllLives(success, fail) {
  const lives = await api.get(`/api/v1/lives`).then(success);
  // .catch();
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
async function getMyLives(success, fail, myid) {
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
async function getLiveDetails(success, fail, sessionId) {
  const live = await api.get(`/api/v1/lives`, sessionId).then(success);
  // .catch();
  return live;
}

////////////////////////////////////////////////////////////

export { getToken, closeSession, getAllLives, getMyLives, getLiveDetails };
