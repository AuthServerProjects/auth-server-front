import React from "react";
import Header from "../../components/layout/header/Header";
import Sidebar from "../../components/layout/sidebar/Sidebar";

const DashboardMainPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Header />
    </div>
  );
};

export default DashboardMainPage;
