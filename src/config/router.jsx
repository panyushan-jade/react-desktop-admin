import React, { lazy } from "react";
import App from "../App";
import ErrorPage from '../pages/ErrorPage'
import { createBrowserRouter, Navigate } from "react-router-dom";
import { IconHome,IconAppCenter } from '@douyinfe/semi-icons';
// const App = lazy(() => import("../App"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const VideoPage = lazy(() => import("../pages/Content/Video"));
const LoginPage = lazy(() => import("../pages/Login"));


const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            title: "工作台",
            icon: <IconHome size="large" />,
            element: <Dashboard />,
          },
          {
            path: "/content",
            title: "内容管理",
            icon: <IconAppCenter size="large" />,
            children: [
              {
                path: "/content/video",
                title: "视频管理",
                element: <VideoPage />,
              }
            ],
          },
          {
            path: "*",
            element: <Navigate to="/" replace={true} />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  

];

export { routes };

export default createBrowserRouter(routes);