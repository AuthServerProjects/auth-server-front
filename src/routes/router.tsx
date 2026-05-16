import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import ErrorPage from "./ErrorPage";

import DashboardMainPage from "../modules/dashboard/DashboardMainPage";
import UsersMainPage from "../modules/users/UsersMainPage";
import ClientsMainPage from "../modules/clients/ClientsMainPage";
import SessionMainPage from "../modules/sessions/SessionMainPage";

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
      //   { path: "*", element: <NotFound /> },
    ],
  },
]);
