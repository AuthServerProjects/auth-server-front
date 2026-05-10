import Header from "../../components/layout/header/Header";
import Sidebar from "../../components/layout/sidebar/Sidebar";
import DashboardLayout from "./components/DashboardLayout";

const DashboardMainPage = () => {
  return (
    <>
      <div>
        <Header />
        <div className="flex">
          <Sidebar />
          <DashboardLayout />
        </div>
      </div>
    </>
  );
};

export default DashboardMainPage;
