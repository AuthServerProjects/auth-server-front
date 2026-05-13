import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import ErrorPage from "./ErrorPage";

import Dashboard from "../modules/dashboard/DashboardMainPage";
import UsersMainPage from "../modules/users/UsersMainPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <UsersMainPage /> },
      //   { path: "*", element: <NotFound /> },
    ],
  },
]);
