import { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { LuSearch } from "react-icons/lu";

import { mockUsers } from "./usersData";
import SVG from "../../components/SVG/SVG";
import UsersTable from "./components/UsersTable";
import AddUserModal from "./components/AddUserModal";
import UserModal from "./components/UserModal";

type ActiveModal = "search" | "create" | null;

const UsersMainPage = () => {
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
          title="افزودن کاربر"
          onClose={() => setActive(null)}
          onCancel={() => setActive("search")}
        />
      )}

      <div className="flex flex-col w-full p-6">
        <div className="flex justify-between">
          <div className="flex text-black-100 space-x-3 font-bold">
            <FiUsers size={24} />
            <h2>مدیریت کاربران</h2>
          </div>
          <button
            type="button"
            onClick={() => setActive("search")}
            className="flex items-center gap-2 bg-gray-100 text-white px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer"
          >
            <SVG name="AddIcon" />
            افزودن کاربر
          </button>
        </div>

        <div className="flex flex-col w-full border border-gray-50 bg-white rounded-lg mt-4">
          <div className="flex justify-between p-4">
            <div className="relative">
              <LuSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="جستجو با نام کاربری"
                className="w-full py-2 pl-4 pr-10 border rounded-lg"
              />
            </div>
            <button
              type="button"
              onClick={() => console.log("clicked")}
              className="flex items-center gap-2 bg-green-10 text-white px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer"
            >
              <SVG name="DownloadIcon" />
              خروجی اکسل
            </button>
          </div>
          <UsersTable data={mockUsers} />
        </div>
      </div>
    </>
  );
};

export default UsersMainPage;
