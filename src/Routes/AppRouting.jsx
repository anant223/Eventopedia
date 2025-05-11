import React, {lazy} from "react";
import { createBrowserRouter, Navigate } from "react-router-dom"
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../Layouts/AuthLayout";

const Home = lazy(() => import( "../pages/Home"));
const Auth = lazy(() => import("../pages/Auth"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Hosters = lazy(() => import("../pages/Hosters"));
const EventFrom = lazy(() => import("../pages/EventFrom"));
const Events = lazy(() => import("../pages/Events"));
const EditProfile = lazy(() => import("../pages/EditProfile"));
const VideoCall = lazy(() => import("../pages/VideoCall"));
const EventDetail = lazy(() => import("../pages/EventDetail"));

// import Home from "../pages/Home";
// import Auth from "../pages/Auth";
// import Dashboard from "../pages/Dashboard";
// import Hosters from "../pages/Hosters";
// import EventFrom from "../pages/EventFrom";
// import Events from "../pages/Events";
// import EditProfile from "../pages/EditProfile";
// import VideoCall from "../pages/VideoCall";
// import EventDetail from "../pages/EventDetail";

const AppRouting = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "auth", //auth?type=login or singup
        element: <Auth />,
      },
    ],
  },
  {
    path: "/main",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="all-events" />,
      },
      {
        path: "all-events",
        element: <Events />,
      },
      {
        path: "one-o-one",
        element: <VideoCall />,
      },
      {
        path: "user-profile",
        element: <Dashboard />,
      },
      {
        path: "all-orgnizers",
        element: <Hosters />,
      },
      {
        path: "create-event",
        element: <EventFrom />,
      },
    ],
  },
]);
export default AppRouting;