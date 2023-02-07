import { OVApi } from "./api";
import { api, fileApi } from "./api";
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
////////////////////////////////////////////////////////////

/**
 * 라이브 시작하기
 * @param {*} data {title,description,url,live,latitude,longtitude, sessionId}
 * @param {*} success
 * @param {*} fail
 * @returns
 */
async function createLive(data, success, fail) {
  const lives = await api
    .post(`/api/v1/lives`, data, {
      AUTHORIZATION: "Bearer " + sessionStorage.getItem("accessToken"),
    })
    .then(success)
    .catch(fail);
  return lives;
}
async function createLiveOld(id, data, success, fail) {
  // api.defaults.headers["AUTHORIZATION"] =
  //   "Bearer " + sessionStorage.getItem("accessToken");
  console.log(id);
  console.log(data);
  console.log("가자");
  const lives = await api
    .post(`/api/v1/lives/${id}`, JSON.stringify(data))
    .then(success)
    .catch(fail);
  return lives;
}
/**
 * 라이브 카테고리 설정
 * @param {*} data {liveCategoryReqList{ categoryName:""}}
 * @param {*} success
 * @param {*} fail
 */
async function setLiveCategory(data, success, fail) {
  return await api
    .post(`/api/v1/lives/category`, data)
    .then(success)
    .catch(fail);
}
async function setLiveCategoryOld(id, data, success, fail) {
  return await api
    .post(`/api/v1/lives/category/${id}`, data)
    .then(success)
    .catch(fail);
}

/**
 * 라이브 썸네일 설정
 * @param {*} data
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
async function setLiveImageOld(id, data, success, fail) {
  await fileApi
    .post(`/api/v1/lives/save/img/${id}`, data)
    .then(success)
    .catch(fail);
}

export {
  getToken,
  closeSession,
  getAllLives,
  createLive,
  setLiveCategory,
  setLiveImage,
  createLiveOld,
  setLiveCategoryOld,
  setLiveImageOld,
};
