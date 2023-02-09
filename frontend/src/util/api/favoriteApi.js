import { api } from "./api";

/**
 * 찜한 모든 live 조회
 * @param {*} success
 * @param {*} userId 유저아이디
 */

async function getFavoriteLives(userId, success, fail) {
  const favorite = await api.get("/api/v1/favorite/" + userId).then(success);
  return favorite;
}

/**
 * 해당 라이브가 찜이 되있는지 여부에 대한 조회
 *
 *
 */
async function postIsFavoriteLive(favoriteInfo, success, fail) {
  const isFavorite = await api
    .post("/api/v1/favorite/detail", favoriteInfo)
    .then(success)
    .catch(fail);
  return isFavorite;
}

/**
 * 해당 라이브가 찜이 되있는지 여부에 대한 조회
 *
 *
 */
async function postFavoriteLive(favoriteInfo, success, fail) {
  const favorite = await api
    .post("/api/v1/favorite", favoriteInfo)
    .then(success)
    .catch(fail);
  return favorite;
}

/**
 * 해당 라이브가 찜이 되있는지 여부에 대한 조회
 *
 *
 */
async function deleteFavoriteLive(favoriteInfo, success, fail) {
  const favorite = await api
    .delete("/api/v1/favorite", favoriteInfo)
    .then(success)
    .catch(fail);
  return favorite;
}

export {
  getFavoriteLives,
  postIsFavoriteLive,
  postFavoriteLive,
  deleteFavoriteLive,
};
