import { Navigate } from "react-router-dom";
import Signin from "../../modules/auth/signin/Signin";
import Signup from "../../modules/auth/signup/Signup";
import CalendarPage from "../../modules/calendar";

// Settings
import SettingLayout from "../../modules/settings/layouts/SettingLayout";
import Users from "../../modules/settings/users";
import Preferences from "../../modules/settings/preferences";

export const AUTHENTICATE_ROUTES = [
  {
    path: "/auth/login",
    element: <Signin />,
  },
  {
    path: "/auth/signup",
    element: <Signup />,
  },
];

export const ROUTES_CONFIG = [
  {
    path: "/",
    element: <Navigate to="/calendar" replace />,
  },
  {
    path: "/calendar",
    element: <CalendarPage />,
  },
  {
    path: "/settings/*",
    element: <SettingLayout />,
  },
];

export const SETTINGS_ROUTES = [
  {
    path: "users",
    element: <Users />,
  },
  {
    path: "preferences",
    element: <Preferences />,
  },
];
