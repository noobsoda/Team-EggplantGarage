import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../util/api/userApi";

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

export const getIsLogin = (state) => state.user.isLogin;
export const getIsLoginError = (state) => state.user.isLoginError;
export const getIsValidToken = (state) => state.user.isValidToken;
export const getUserInfo = (state) => state.user.userInfo;

// Action creators are generated for each case reducer function
export const { setIsLogin, setIsLoginError, setIsValidToken, setUserInfo } =
  userSlice.actions;

export const userConfirm = (userData) => (dispatch) => {
  login(
    userData,
    ({ data }) => {
      //토큰 받아오기
      let accessToken = data["accessToken"];
      let refreshToken = data["refreshToken"];
      console.log(accessToken);
      console.log(refreshToken);
      dispatch(setIsLogin(true));
    },
    () => {}
  );
};

export default userSlice.reducer;
