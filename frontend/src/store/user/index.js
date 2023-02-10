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
  login(
    userData,
    ({ res }) => {
      //토큰 받아오기
      let accessToken = res["accessToken"];
      dispatch(setIsLogin(true));
      dispatch(setIsLoginError(false));
      dispatch(setIsValidToken(true));

      sessionStorage.setItem("accessToken", accessToken);
      //해당 유저의 간단 정보 가져와서 info에 저장
      userInfo(
        ({ info }) => {
          dispatch(setUserInfo(info));
        },
        () => {}
      );
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
export const getUserInfo = (navigate) => (dispatch) => {
  userInfo(
    ({ data }) => {
      console.log(data);
      dispatch(setUserInfo(data));
    },
    (e) => {
      console.log(e);
      alert("다시 로그인 해주쇼");
      //refresh로 access갱신
      tokenRegenerationAction(navigate);
    }
  );
};

/**
 * 로그아웃 진행
 * @returns
 */
export const logoutAction = (navigate) => (dispatch) => {
  logout(
    () => {
      dispatch(setIsLogin(false));
      dispatch(setUserInfo(null));
      dispatch(setIsValidToken(false));
      navigate("/");
    },
    () => {
      console.warn("logout fail");
    }
  );
};

/**
 * 토큰 다시 받기
 * @returns
 */
export const tokenRegenerationAction = (navigate) => (dispatch) => {
  tokenRegeneration(
    ({ data }) => {
      //재발급 성공
      let accessToken = data["accessToken "];
      sessionStorage.setItem("accessToken", accessToken);
      dispatch(setIsValidToken(true));
    },
    () => {
      // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
      // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
      console.warn("no session");
      //너무 오래된 refresh로 로그아웃 진행
      logout(
        () => {
          //로그아웃 진행
          dispatch(setIsLogin(false));
          dispatch(setUserInfo(null));
          dispatch(setIsValidToken(false));
          navigate("/login"); //로그인페이지로 이동
        },
        (error) => {
          console.warn("logout fail");
          dispatch(setIsLogin(false));
          dispatch(setUserInfo(null));
        }
      );
    }
  );
};

export default userSlice.reducer;
