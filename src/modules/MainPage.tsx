import Header from "../components/layout/header/Header";
import Sidebar from "../components/layout/sidebar/Sidebar";
import DashboardMainPage from "./dashboard/DashboardMainPage";

const MainPage = () => {
  return (
    <>
      <div>
        <Header />
        <div className="flex">
          <Sidebar />
          <DashboardMainPage />
        </div>
      </div>
    </>
  );
};

export default MainPage;
