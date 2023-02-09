import { api } from "./api";

async function getReviewMine(myreviewid, success, fail) {
  const review = await api.get(`/api/v1/reviews/` + myreviewid).then(success);
  // .catch();
  return review;
}

async function getReviewOther(otherreviewid, success, fail) {
  const review = await api
    .get(`/api/v1/reviews/` + otherreviewid)
    .then(success);
  // .catch();
  return review;
}

async function postReview(review, success, fail) {
  await api.post(`/api/v1/reviews`, review).then(success).catch(fail);
}

export { getReviewMine, getReviewOther, postReview };
