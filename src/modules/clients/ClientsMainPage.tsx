import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { FiServer } from "react-icons/fi";

import SVG from "../../components/SVG/SVG";
import { mockClients } from "./clientsData";
import ClientModal from "./components/ClientModal";
import ClientsTable from "./components/ClientsTable";

const ClientsMainPage = () => {
  const [openModal, setOpenModal] = useState<boolean>();

  return (
    <>
      {openModal && (
        <ClientModal
          isEdit={false}
          title="ایجاد کلاینت"
          onClose={() => setOpenModal(false)}
        />
      )}

      <div className="flex flex-col w-full p-6">
        <div className="flex justify-between">
          <div className="flex text-black-100 space-x-3 font-bold">
            <FiServer size={24} />
            <h2>مدیریت کلاینت‌ها</h2>
          </div>
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-gray-100 text-white px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer"
          >
            <SVG name="AddIcon" />
            ایجاد کلاینت
          </button>
        </div>

        <div className="flex flex-col w-full border border-gray-50 bg-white rounded-lg mt-4">
          <div className="flex justify-between p-4">
            <div className="relative">
              <LuSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="جستجو با شناسه کلاینت"
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
          <ClientsTable data={mockClients} />
        </div>
      </div>
    </>
  );
};

export default ClientsMainPage;
