import { api } from "./api";

/**
 * 회원가입
 * @param {*} user 유저정보로 이메일, 비밀번호, 닉네임, 이름을 입력한다.
 * @param {*} success 성공시의 콜백함수
 * @param {*} fail 실패시의 콜백함수
 */
async function signup(user, success, fail) {
  await api.post(`/api/v1/users`, user).then(success).catch(fail);
}

/**
 * 이메일 중복확인한다.
 * @param {*} userEmail 유저의 이메일을 입력받는다.
 * @param {*} success 성공시의 콜백함수
 * @param {*} fail 실패시의 콜백함수
 */
async function emailCheck(userEmail, success, fail) {
  await api.get(`/api/v1/users/email/${userEmail}`).then(success).catch(fail);
}

/**
 * 닉네임 중복 확인
 * @param {*} userNickName 유저의 닉네임 입력
 * @param {*} success 성공시의 콜백함수
 * @param {*} fail 실패시의 콜백함수
 */
async function nickNameCheck(userNickName, success, fail) {
  await api.get(`/api/v1/users/nickname/${userNickName}`).then(success).catch(fail);
}

/**
 * 로그인 진행
 * @param {*} data {email, password}
 * @param {*} success
 * @param {*} fail
 */
async function login(data, success, fail) {
  await api.post(`/api/v1/auth/login`, data).then(success).catch(fail);
}
/**
 * 유저 정보 조회
 * @param {*} success
 * @param {*} fail
 */
async function userInfo(success, fail) {
  await api
    .get("/api/v1/users/me", {
      headers: {
        AUTHORIZATION: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    })
    .then(success)
    .catch(fail);
}

/**
 * 로그아웃 진행
 * @param {*} success
 * @param {*} fail
 */
async function logout(success, fail) {
  await api.post("/api/v1/auth/logout").then(success).catch(fail);
}

/**
 * 토큰 재발급 진행
 * @param {*} success
 * @param {*} fail
 */
async function tokenRegeneration(success, fail) {
  await api.post(`/api/v1/auth/reissue`).then(success).catch(fail);
}

export { signup, emailCheck, nickNameCheck, login, userInfo, logout, tokenRegeneration };
