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
////////////////////////////////////////////////////////////

export { getToken, closeSession, getAllLives };
