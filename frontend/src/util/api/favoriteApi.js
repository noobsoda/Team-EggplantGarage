import { api } from "./api";

/**
 * 찜한 모든 live 조회
 * @param {*} success
 * @param {*} userId 유저아이디
 */

async function getFavoriteLives(userId, success, fail) {
  const favorite = await api
    .get(`/api/v1/favorite/${userId}`)
    .then(success)
    .catch(fail);
  return favorite;
}

/**
 * 해당 라이브가 찜했는지 여부 확인
 * @param {*} favoriteInfo {liveId:1,userId:1}
 * @param {*} success
 * @param {*} fail
 * @returns
 */
async function isFavoriteLive(favoriteInfo, success, fail) {
  const isFavorite = await api
    .post("/api/v1/favorite/detail", favoriteInfo)
    .then(success)
    .catch(fail);
  return isFavorite;
}

/**
 * 종아요 표시 삭제
 * @param {*} favoriteInfo { "liveId": 5, "userId": 3}
 * @param {*} success
 * @param {*} fail
 * @returns
 */
async function deleteFavoriteLive(favoriteInfo, success, fail) {
  const favorite = await api
    .delete("/api/v1/favorite", { data: favoriteInfo })
    .then(success)
    .catch(fail);
  return favorite;
}

/**
 * 라이브 좋아요 추가
 * @param {*} favoriteInfo {liveId:1,userId:1}
 * @param {*} success
 * @param {*} fail
 * @returns
 */
async function addFavoriteLive(favoriteInfo, success, fail) {
  return await api
    .post(`/api/v1/favorite/`, favoriteInfo)
    .then(success)
    .catch(fail);
}
export {
  getFavoriteLives,
  isFavoriteLive,
  addFavoriteLive,
  deleteFavoriteLive,
};
