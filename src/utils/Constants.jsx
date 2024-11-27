import {createBrowserRouter, Navigate} from "react-router-dom";
import StreamChannel from "../components/StreamChannel";
import Home from "../components/Home";
import ChannelManagement from "../components/ChannelManagement";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>
    },
    {
        path: "stream/:id",
        element: <StreamChannel></StreamChannel>
    },
    {
        path: "admin",
        element: <ChannelManagement></ChannelManagement>
    },
    {
        path: "*",
        element: <Navigate to="/"/>,
    },
]);
