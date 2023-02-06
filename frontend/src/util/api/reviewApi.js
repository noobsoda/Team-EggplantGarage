import { api } from "./api";

/**
 * 내가 쓴 리뷰 한건 가져오기
 *
 * @param {*} success
 * @param {*} fail
 * @param {*} myreviewid 내 리뷰 아이디
 * @returns content:리뷰내용 , score:별점
 *
 */
async function getReviewMine(success, fail, myreviewid) {
  const review = await api.get(`/api/v1/reviews/` + myreviewid).then(success);
  // .catch();
  return review;
}

/**
 *
 * @param {*} success
 * @param {*} fail
 * @param {*} otherreviewid 상대방이 쓴 리뷰아이디 product 에 들어있음
 * @returns content:리뷰내용 , score:별점
 */
async function getReviewOther(success, fail, otherreviewid) {
  const review = await api
    .get(`/api/v1/reviews/` + otherreviewid)
    .then(success);
  // .catch();
  return review;
}

/**
 *
 * @param {*} success
 * @param {*} fail
 * @param {*} review content,prouductId,score,seller:boolean,visible:boolean
 */
async function postReview(success, fail, review) {
  await api.post(`/api/v1/reviews`, review).then(success).catch(fail);
}

export { getReviewMine, getReviewOther, postReview };
