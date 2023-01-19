import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//라우터에 맞는 페이지 지정
import Test from "./Components/Pages/Test";
import Canvas from "./Components/Pages/Canvas";

const Router = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Test /> },
    { path: "/test", element: <div>test두번째</div> },
    { path: "/canvas", element: <Canvas /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
