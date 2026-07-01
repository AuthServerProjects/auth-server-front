import { useState } from "react";
import { FiServer } from "react-icons/fi";

import { mockClients } from "./clientsData";
import ClientModal from "./components/ClientModal";
import ClientsTable from "./components/ClientsTable";
import PagesHeader from "../../components/PagesHeader";
import TablesHeader from "../../components/TablesHeader";

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
        <PagesHeader
          title="مدیریت کلاینت‌ها"
          icon={<FiServer size={24} />}
          buttonLabel="افزودن کلاینت‌"
          modalHandling={() => setOpenModal(true)}
        />

        <div className="flex flex-col w-full border border-gray-50 bg-white rounded-lg mt-4">
          <TablesHeader placeHolder="جستجو با شناسه کلاینت" />
          <ClientsTable data={mockClients} />
        </div>
      </div>
    </>
  );
};

export default ClientsMainPage;
