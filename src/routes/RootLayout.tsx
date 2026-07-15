import Header from "../components/layout/header/Header";
import Sidebar from "../components/layout/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { SelectedClientProvider } from "../context/SelectedClientContext";

const RootLayout = () => {
  return (
    <SelectedClientProvider>
      <Header />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </SelectedClientProvider>
  );
};

export default RootLayout;
