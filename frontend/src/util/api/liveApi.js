import { api } from "./api";

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
  const response = await api.post("api/sessions", {
    customSessionId: sessionId,
  });
  return response.data; // The sessionId
}

async function createToken(sessionId) {
  const response = await api.post(
    "api/sessions/" + sessionId + "/connections",
    {}
  );
  return response.data; // The token
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

export { getToken, getAllLives };
