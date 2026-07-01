import { LuUserCog } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

import { mockRole } from "./roleData";
import RolesTable from "./components/RolesTable";
import PagesHeader from "../../components/PagesHeader";
import TablesHeader from "../../components/TablesHeader";

const RolesMainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full p-6">
      <PagesHeader
        title="مدیریت نقش‌ها"
        icon={<LuUserCog size={24} />}
        buttonLabel="افزودن نقش‌"
        modalHandling={() => navigate("/role/create")}
      />
      <div className="flex flex-col w-full border border-gray-50 bg-white rounded-lg mt-4">
        <TablesHeader placeHolder="جستجو با نام نقش" />
        <RolesTable data={mockRole} />
      </div>
    </div>
  );
};

export default RolesMainPage;
