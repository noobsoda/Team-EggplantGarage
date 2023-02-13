import { api, fileApi } from "./api";

/**
 * 상품 등록
 * @param {*} data
 * @param {*} success
 * @param {*} fail
 */
async function setLiveProduct(data, success, fail) {
  await fileApi.post(`/api/v1/products`, data).then(success).catch(fail);
}

/**
 *
 * @param {*} success 성공시 전달되는 콜백함수
 * @param {*} fail 실패시 콜백함수
 * @param {*} buyerid 구매자아이디 집어넣는곳
 * "imageUrl": "string"
 *  "leftTopX": 0
 *  "leftTopY": 0
 *  "myReviewId": 0
 *  "otherId": 0
 *  "otherName": "string"
 *  "otherReviewId": 0
 *  "paid": true
 *  "productName": "string"
 *  "rightBottomX": 0
 *  "rightBottomY": 0
 *  "soldPrice": 0
 * @returns
 */
async function getPurchasedList(buyerId, success, fail) {
  const items = await api.get(`/api/v1/history/buyer/` + buyerId).then(success);
  // .catch();
  return items;
}

/**
 * 구매자가 묶음 상품을 등록한다.
 * @param {*} bundle {"productIdList": [],
   "buyerId": 3,
   "soldPrice": 30000,
   "liveId": 1}
 * @param {*} success 
 * @param {*} fail 
 * 
 */
async function postBundle(bundle, success, fail) {
  await api.post(`/api/v1/bundle`, bundle).then(success).catch(fail);
}

/**
 * 판매자가 받은 묶음 제안 목록을 본다.
 * @param {*} liveId
 * @param {*} success
 * @param {*} fail
 */
async function getSellerSuggestList(liveId, success, fail) {
  await api
    .get(`/api/v1/bundle/seller/` + liveId)
    .then(success)
    .catch(fail);
}
/**
 * 구매자의 제안한 목록을 본다.
 * @param {*} liveId
 * @param {*} buyerId
 * @param {*} success
 * @param {*} fail
 */
async function getBuyerSuggestList(liveId, buyerId, success, fail) {
  await api
    .get(`/api/v1/bundle/buyer/` + liveId + `/` + buyerId)
    .then(success)
    .catch(fail);
}
/**
 * 구매자가 제안한 목록에서 승인을 받고 아직 결제를 진행하지 않는 목록
 * @param {*} liveId
 * @param {*} buyerId
 * @param {*} success
 * @param {*} fail
 */
async function getBuyerSuggestListPayWait(liveId, buyerId, success, fail) {
  await api
    .get(`/api/v1/bundle/buyer/approvalNoPaid/` + liveId + `/` + buyerId)
    .then(success)
    .catch(fail);
}

/**
 * 구매자가 제안한 목록에서 승인과 결제를 진행한 목록
 * @param {*} liveId
 * @param {*} buyerId
 * @param {*} success
 * @param {*} fail
 */
async function getBuyerSuggestListPayComplete(liveId, buyerId, success, fail) {
  await api
    .get(`/api/v1/bundle/buyer/approvalYesPaid/` + liveId + `/` + buyerId)
    .then(success)
    .catch(fail);
}

/**
 * 해당 묶음 상품들 목록을 조회한다.
 * @param {*} bundleId 묶음 아이디
 * @param {*} success
 * @param {*} fail
 */
async function getBundleItemList(bundleId, success, fail) {
  await api
    .get(`/api/v1/bundle/items/` + bundleId)
    .then(success)
    .catch(fail);
}
/**
 * 해당 묶음에 대해 승인
 * @param {*} bundleId
 * @param {*} success
 * @param {*} fail
 */
async function setBundleApproval(bundleId, success, fail) {
  await api
    .patch(`/api/v1/bundle/approval/` + bundleId)
    .then(success)
    .catch(fail);
}
/**
 * 해당 묶음에 대해 거절
 * @param {*} bundleId
 * @param {*} success
 * @param {*} fail
 */
async function setBundleRefuse(bundleId, success, fail) {
  await api
    .patch(`/api/v1/bundle/refuse/` + bundleId)
    .then(success)
    .catch(fail);
}

/**
 * 카카오페이 결제 진행
 * @param {*} payInfo { bundleId: bundleId, pcOrMobile: pc }
 * @param {*} success
 * @param {*} fail
 * @returns
 */
async function kakaopay(payInfo, success, fail) {
  return await api.post(`/api/v1/kakaoPay/`, payInfo).then(success).catch(fail);
}

/**
 * 이미지 가져오기
 * @param {*} filename
 * @returns
 */
function getImage(filename) {
  return `${process.env.REACT_APP_API_URL}api/v1/file/images/${filename}`;
}

async function getSalesItemHistory(liveId, success, fail) {
  await api
    .get(`/api/v1/history/live/` + liveId)
    .then(success)
    .catch(fail);
}
export {
  getPurchasedList,
  postBundle,
  getSellerSuggestList,
  getBundleItemList,
  getBuyerSuggestList,
  getBuyerSuggestListPayWait,
  getBuyerSuggestListPayComplete,
  setBundleApproval,
  setBundleRefuse,
  setLiveProduct,
  kakaopay,
  getSalesItemHistory,
  getImage,
};
