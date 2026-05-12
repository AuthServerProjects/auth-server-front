import Header from "../components/layout/header/Header";
import Sidebar from "../components/layout/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <div>
        <Header />
        <div className="flex">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
