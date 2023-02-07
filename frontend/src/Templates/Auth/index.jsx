import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkIsLogin } from "../../store/user";

export default function AuthLayout() {
  const navigate = useNavigate();
  const isLogin = useSelector(checkIsLogin);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}
