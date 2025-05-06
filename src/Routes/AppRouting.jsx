import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../Layouts/AuthLayout";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Hosters from "../pages/Hosters";
import EventFrom from "../pages/EventFrom";
import Events from "../pages/Events";
import EditProfile from "../pages/EditProfile";
import { UserProfileFrom } from "../components";
import VideoCall from "../pages/VideoCall";
import EventDetail from "../pages/EventDetail";

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
        path: "auth",
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
        element: <Events />,

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