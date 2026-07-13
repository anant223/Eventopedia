import React, {lazy} from "react";
import { createBrowserRouter, Navigate } from "react-router-dom"
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../Layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute  from "./PublicRoute";
import OnBoardingRoute from "./OnBoardingRoute";



const Home = lazy(() => import( "../pages/Home"));
const Auth = lazy(() => import("../pages/Auth"));
const Profile = lazy(() => import("../pages/Profile"));
const EventFrom = lazy(() => import("../pages/EventFrom"));
const Events = lazy(() => import("../pages/Events"));
const EventDetail = lazy(() => import("../pages/EventDetail"));
const Checkout = lazy(() => import("../pages/Checkout"))
const PaymentSuccess = lazy(() => import("../pages/paymentSuccess"))
const OnBoarding = lazy(() => import("@/pages/Welcome"));
const Notification = lazy(() => import("@/pages/Notification"));
const Settings = lazy(() => import("../pages/Settings"));
const Verify = lazy(() => import("../pages/Verifying"));
const ForgetPassword = lazy(() => import("../pages/ForgetPassword"))
const ResetPassword = lazy(() => import("../pages/ResetPassword"))
const AppRouting = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "forgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword/>,
      },
    ],
  },
  {
    path: "verifying-request",
    element: <Verify />,
  },
  {
    path: "/onboarding",
    element: (
      <ProtectedRoute>
        <OnBoarding />
      </ProtectedRoute>
    ),
  },
  {
    path: "/main",
    element: (
      <ProtectedRoute>
        <OnBoardingRoute>
          <MainLayout />
        </OnBoardingRoute>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="all-events" />,
      },
      {
        path: "all-events",
        element: <Events />,
      },
      // {
      //   path: "notifications",
      //   element: <Notification />,
      // },
      // {
      //   path: "user-profile/:id",
      //   element: <Profile />,
      // },
      // {
      //   path: "create-event",
      //   element: <EventFrom />,
      // },
      // {
      //   path: "event-detail/:id",
      //   element: <EventDetail />,
      // },
      // {
      //   path: "checkout",
      //   element: <Checkout />,
      // },
      // {
      //   path: "payment-success",
      //   element: <PaymentSuccess />,
      // },
      // {
      //   path: "settings",
      //   element: <Settings />,
      // },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
export default AppRouting;