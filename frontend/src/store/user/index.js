import { createSlice } from "@reduxjs/toolkit";

import {
  login,
  logout,
  userInfo,
  tokenRegeneration,
} from "../../util/api/userApi";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false, //로그인 여부
    isLoginError: false, //로그인 오류 여부
    userInfo: null, //유저 정보
    isValidToken: false, //토큰 검증 유무
  },
  reducers: {
    setIsLogin: (state, isLogin) => {
      state.isLogin = isLogin.payload;
    },
    setIsLoginError: (state, isLoginError) => {
      state.isLoginError = isLoginError.payload;
    },
    setIsValidToken: (state, isValidToken) => {
      state.isValidToken = isValidToken.payload;
    },
    setUserInfo: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo.payload;
    },
  },
});

export const checkIsLogin = (state) => state.user.isLogin;
export const checkIsLoginError = (state) => state.user.isLoginError;
export const checkIsValidToken = (state) => state.user.isValidToken;
export const checkUserInfo = (state) => state.user.userInfo;

// Action creators are generated for each case reducer function
export const { setIsLogin, setIsLoginError, setIsValidToken, setUserInfo } =
  userSlice.actions;

/**
 * 해당 유저 정보로 로그인 진행
 * @param {*} userData {email:email, password:password}
 * @returns
 */
export const userConfirm = (userData, navigate) => (dispatch) => {
  console.log(userData);
  login(
    userData,
    ({ data }) => {
      //토큰 받아오기
      let accessToken = data["accessToken"];
      let refreshToken = data["refreshToken"];

      dispatch(setIsLogin(true));
      dispatch(setIsLoginError(false));
      dispatch(setIsValidToken(true));

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      console.log("확인하자");
      console.log(sessionStorage.getItem("accessToken"));
      console.log(data);
      console.log(data["accessToken"]);
      navigate("/");
    },
    () => {
      console.log("에러요");
    }
  );
};

/**
 * 유저의 정보 확인 - 토큰이 내장되서 전송
 * @returns
 */
export const getUserInfo = () => (dispatch) => {
  userInfo(
    ({ data }) => {
      console.log(data);
      dispatch(setUserInfo(data));
    },
    (e) => {
      console.log(e);
      alert("다시 로그인 해주쇼");
    }
  );
};

/**
 * 로그아웃 진행
 * @returns
 */
export const logoutAction = () => (dispatch) => {
  logout(
    () => {
      dispatch(setIsLogin(false));
      dispatch(setUserInfo(null));
      dispatch(setIsValidToken(false));
    },
    (e) => {
      console.log(e);
    }
  );
};

export const tokenRegenerationAction = () => (dispatch) => {
  tokenRegeneration(
    ({ data }) => {
      if (data.status === "ok") {
        let accessToken = data["accessToken "];
        sessionStorage.setItem("accessToken", accessToken);
        dispatch(setIsValidToken(true));
      }
    },
    () => {
      // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
      // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
      logout(
        () => {
          alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
          dispatch(setIsLogin(false));
          dispatch(setUserInfo(null));
          dispatch(setIsValidToken(false));
        },
        (error) => {
          console.log(error);
          dispatch(setIsLogin(false));
          dispatch(setUserInfo(null));
        }
      );
    }
  );
};

export default userSlice.reducer;
