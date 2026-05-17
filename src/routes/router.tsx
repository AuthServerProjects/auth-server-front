import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import ErrorPage from "./ErrorPage";

import DashboardMainPage from "../modules/dashboard/DashboardMainPage";
import UsersMainPage from "../modules/users/UsersMainPage";
import ClientsMainPage from "../modules/clients/ClientsMainPage";
import SessionMainPage from "../modules/sessions/SessionMainPage";
import RolesMainPage from "../modules/roles/RolesMainPage";
import PermissionsMainPage from "../modules/permissions/PermissionsMainPage";
import LogsMainPage from "../modules/log/LogsMainPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "dashboard", element: <DashboardMainPage /> },
      { path: "users", element: <UsersMainPage /> },
      { path: "clients", element: <ClientsMainPage /> },
      { path: "sessions", element: <SessionMainPage /> },
      { path: "roles", element: <RolesMainPage /> },
      { path: "permissions", element: <PermissionsMainPage /> },
      { path: "logs", element: <LogsMainPage /> },
      //   { path: "*", element: <NotFound /> },
    ],
  },
]);
