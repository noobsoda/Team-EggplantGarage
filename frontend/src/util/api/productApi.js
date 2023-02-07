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

export { setLiveProduct };
