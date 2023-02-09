import { api } from "./api";

/**
 * 찜한 live 조회
 * @param {*} success
 * @param {*} userId 유저아이디
 */

async function getLikeLives(userId, success, fail) {
  const lives = await api.get("/api/v1/favorite/" + userId).then(success);
  return lives;
}

export { getLikeLives };
