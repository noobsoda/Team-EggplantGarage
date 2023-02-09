import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//라우터에 맞는 페이지 지정
import Main from "./Pages/Main/Main";
import LiveShowSubmit from "./Pages/LiveShow/LiveShowSubmit";
import LiveShowSeller from "./Pages/LiveShow/LiveShowSeller";
import SignUp from "./Pages/User/SignUp";
import SignUpEmail from "./Pages/User/SignUpEmail";
import Login from "./Pages/User/Login";
import Search from "./Pages/Search/Search";
import Mypage from "./Pages/Mypage/Mypage";
import Chat from "./Pages/Chat/Chat";
import Like from "./Pages/Like/Like";
import Category from "./Pages/Main/Category";
import InfoEdit from "./Pages/Mypage/InfoEdit";
import LiveshowDetail from "./Pages/LiveShow/LiveshowDetail";
import WriteReview from "./Pages/Mypage/WriteReview";
import Review from "./Pages/Mypage/Review";
import LiveshowBuyer from "./Pages/LiveShow/LiveshowBuyer";

// import Auth from "./Templates/Auth";

const Router = () => {
  /*
  const router = createBrowserRouter([
    {
      element: <Auth />,
      children: [
        { path: "/", element: <Main /> },
        { path: "/home", element: <Main /> },
        { path: "/liveshowsubmit", element: <LiveShowSubmit /> },
        { path: "/liveshowseller/:sessionId", element: <LiveShowSeller /> },
        { path: "/test/:sessionId", element: <LiveShow /> },
        { path: "/liveshowbuyer", element: <LiveshowBuyer /> },
        { path: "/search", element: <Search /> },
        { path: "/like", element: <Like /> },
        { path: "/chat", element: <Chat /> },
        { path: "/mypage", element: <Mypage /> },
        { path: "/category", element: <Category /> },
        { path: "/infoedit", element: <InfoEdit /> },
        { path: "/liveshowdetail", element: <LiveshowDetail /> },
        { path: "/writereview", element: <WriteReview /> },
        { path: "/review", element: <Review /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/signupemail", element: <SignUpEmail /> },
  ]);
*/
  const router = createBrowserRouter([
    { path: "/", element: <Main /> },
    { path: "/home", element: <Main /> },
    { path: "/liveshowsubmit", element: <LiveShowSubmit /> },
    { path: "/liveshowseller/:liveId", element: <LiveShowSeller /> },
    { path: "/liveshowbuyer/:liveId", element: <LiveshowBuyer /> },
    { path: "/search", element: <Search /> },
    { path: "/like", element: <Like /> },
    { path: "/chat", element: <Chat /> },
    { path: "/mypage", element: <Mypage /> },
    { path: "/category", element: <Category /> },
    { path: "/infoedit", element: <InfoEdit /> },
    { path: "/liveshowdetail", element: <LiveshowDetail /> },
    { path: "/writereview", element: <WriteReview /> },
    { path: "/review", element: <Review /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/signupemail", element: <SignUpEmail /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
