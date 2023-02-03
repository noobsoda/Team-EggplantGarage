import { OVApi } from "./api";

/**
 * 세션에서 토큰 가져오기
 * @param {*} hostSessionId
 * @returns
 */
async function getToken(hostSessionId) {
  //sessionid생성
  const sessionId = await createSession(hostSessionId);
  //sessionid로 토큰 생성
  return await createToken(sessionId);
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

async function createToken(sessionId) {
  //role
  const data = { role: "PUBLISHER" };
  const response = await OVApi.post(
    "/openvidu/api/sessions/" + sessionId + "/connection",
    data
  ).catch((e) => {
    console.log(e);
  });
  return response.data.token; // The token
}

export { getToken };
