import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkIsLogin, checkUserInfo, getUserInfo } from "../../store/user";

export default function AuthLayout() {
  const navigate = useNavigate();
  // const isLogin = useSelector(checkIsLogin);
  const [loginCheck, setLoginCheck] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo(navigate, setLoginCheck));
  }, []);

  return <>{loginCheck ? <Outlet /> : <></>}</>;
}
