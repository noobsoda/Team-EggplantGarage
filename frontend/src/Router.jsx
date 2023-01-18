import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//라우터에 맞는 페이지 지정
import Test from "./Components/Pages/Test";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Test />,
    },
    { path: "/test", element: <div>test두번째</div> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
