import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//라우터에 맞는 페이지 지정
import Main from "./Pages/Main";
import LiveShowSubmit from "./Pages/LiveShowSubmit";
import LiveShowSeller from "./Pages/LiveShowSeller";
import LiveShow from "./Pages/LiveShowTest";
import SignUp from "./Pages/SignUp";
import SignUpEmail from "./Pages/SignUpEmail";
import Login from "./Pages/Login";
import Search from "./Pages/Search";
import Mypage from "./Pages/Mypage";
import Chat from "./Pages/Chat";
import Like from "./Pages/Like";
import Category from "./Pages/Category";
import InfoEdit from "./Pages/InfoEdit";
import LiveshowDetail from "./Pages/LiveshowDetail";
import WriteReview from "./Pages/WriteReview";
import Review from "./Pages/Review";

const Router = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Main /> },
    { path: "/home", element: <Main /> },
    { path: "/liveshowsubmit", element: <LiveShowSubmit /> },
    { path: "/liveshowseller/:id", element: <LiveShowSeller /> },
    { path: "/test/:id", element: <LiveShow /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/signupemail", element: <SignUpEmail /> },
    { path: "/search", element: <Search /> },
    { path: "/like", element: <Like /> },
    { path: "/chat", element: <Chat /> },
    { path: "/mypage", element: <Mypage /> },
    { path: "/category", element: <Category /> },
    { path: "/infoedit", element: <InfoEdit /> },
    { path: "/liveshowdetail", element: <LiveshowDetail /> },
    { path: "/writereview", element: <WriteReview /> },
    { path: "/review", element: <Review /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
