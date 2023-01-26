import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//라우터에 맞는 페이지 지정
import Main from "./Pages/Main";
import LiveShowSubmit from "./Pages/LiveShowSubmit";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    { path: "/liveshowsubmit", element: <LiveShowSubmit /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
