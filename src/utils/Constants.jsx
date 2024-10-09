import {createBrowserRouter, Navigate} from "react-router-dom";
import StreamChannel from "../components/StreamChannel";
import Home from "../components/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>
    },
    {
        path: "stream_client/",
        element: <Home></Home>
    },
    {
        path: "stream_client/:id",
        element: <StreamChannel></StreamChannel>
    },
    {
        path: "*", 
        element: <Navigate to="/" />, 
      },
]);
