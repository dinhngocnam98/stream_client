import {createBrowserRouter, Navigate} from "react-router-dom";
import StreamChannel from "../pages/Watch/StreamChannel";
import Home from "../pages/Home/Home";
import Login from "../components/ui/Login";
import News from "../pages/News/News";
import StreamDetail from "../pages/Watch/StreamDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path: "watch/:group/:name",
    element: <StreamChannel></StreamChannel>
  },
  {
    path: "watch/:group",
    element: <StreamDetail></StreamDetail>
  },
  // {
  //     path: "admin",
  //     element: <ChannelManagement></ChannelManagement>
  // },
  {
    path: "login",
    element: <Login></Login>
  },
  {
    path: "*",
    element: <Navigate to="/"/>,
  },
  {
    path: "/news",
    element: <News></News>
  }
], {
  future: {
    v7_skipActionErrorRevalidation: true, // Bật cờ để tương thích React Router v7
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_normalizeFormMethod: true,
    v7_fetcherPersist: true
  },
});
