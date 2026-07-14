import { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

import { mockUsers } from "./usersData";
import UsersTable from "./components/UsersTable";
import UserModal from "./components/modals/UserModal";
import PagesHeader from "../../components/PagesHeader";
import TablesHeader from "../../components/TablesHeader";
import AddUserModal from "./components/modals/AddUserModal";

type ActiveModal = "search" | "create" | null;

const UsersMainPage = () => {
  const [searchParams] = useSearchParams();
  const isFromClient = searchParams.get("isFromClient") === "true";

  const [active, setActive] = useState<ActiveModal>(null);

  return (
    <>
      {/* Modals */}
      {active === "search" && (
        <AddUserModal
          title="افزودن کاربر"
          onClose={() => setActive(null)}
          onAddNew={() => setActive("create")}
        />
      )}

      {active === "create" && (
        <UserModal
          isEdit={false}
          title="ایجاد کاربر"
          onClose={() => setActive(null)}
          onCancel={() => setActive("search")}
           isFromClient={isFromClient}
        />
      )}

      <div className="flex flex-col w-full p-6">
        <PagesHeader
          title="مدیریت کاربران"
          icon={<FiUsers size={24} />}
          buttonLabel="افزودن کاربر"
          modalHandling={() => setActive("search")}
        />

        <div className="flex flex-col w-full border border-gray-50 bg-white rounded-lg mt-4">
          <TablesHeader placeHolder="جستجو با نام کاربری" />
          <UsersTable data={mockUsers} isFromClient={isFromClient} />
        </div>
      </div>
    </>
  );
};

export default UsersMainPage;
