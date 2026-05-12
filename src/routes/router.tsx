import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import ErrorPage from "./ErrorPage";

import Dashboard from "../modules/dashboard/DashboardMainPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      //   { path: "*", element: <NotFound /> },
    ],
  },
]);
