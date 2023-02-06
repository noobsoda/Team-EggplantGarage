import { api } from "./api";

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
async function getBoughtList(success, fail, buyerid) {
  const items = await api.get(`/api/v1/history/buyer/` + buyerid).then(success);
  // .catch();
  return items;
}

/**
 * 
 * @param {*} success 
 * @param {*} fail 
 * @param {*} bundle "productIdList": [],
    "buyerId": 3,
    "soldPrice": 30000,
    "liveId": 1

 */
async function postBundle(success, fail, bundle) {
  await api.post(`/api/v1/bundle`, bundle).then(success).catch(fail);
}
//get bundle 두개
//update bundle/approval
//update bundle/refuge
//

export { getBoughtList };
