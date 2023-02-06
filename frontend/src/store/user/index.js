import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../util/api/userApi";

export const counterSlice = createSlice({
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
    userConfirm: (state, userData) => {
      login(
        userData.payload,
        ({ data }) => {
          console.log(data);
        },
        () => {}
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { userConfirm } = counterSlice.actions;

export default counterSlice.reducer;
