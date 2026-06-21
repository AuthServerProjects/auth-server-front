import { createBrowserRouter } from "react-router-dom";

import ErrorPage from "./ErrorPage";
import RootLayout from "./RootLayout";
import LogsMainPage from "../modules/log/LogsMainPage";
import UsersMainPage from "../modules/users/UsersMainPage";
import RolesMainPage from "../modules/roles/RolesMainPage";
import ClientsMainPage from "../modules/clients/ClientsMainPage";
import RoleDetails from "../modules/roles/components/RoleDetails";
import SessionMainPage from "../modules/sessions/SessionMainPage";
import DashboardMainPage from "../modules/dashboard/DashboardMainPage";
import PermissionsMainPage from "../modules/permissions/PermissionsMainPage";

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
      { path: "role/:type", element: <RoleDetails /> },
      { path: "permissions", element: <PermissionsMainPage /> },
      { path: "logs", element: <LogsMainPage /> },
      //   { path: "*", element: <NotFound /> },
    ],
  },
]);
