import { useState } from "react";
import { LuKey } from "react-icons/lu";

import { mockPermission } from "./permissionsData";
import PagesHeader from "../../components/PagesHeader";
import TablesHeader from "../../components/TablesHeader";
import PermissionModal from "./components/PermissionModal";
import PermissionsTable from "./components/PermissionsTable";

const PermissionsMainPage = () => {
  const [openModal, setOpenModal] = useState<boolean>();

  return (
    <>
      {openModal && (
        <PermissionModal
          isEdit={false}
          title="ایجاد مجوز"
          onClose={() => setOpenModal(false)}
        />
      )}

      <div className="flex flex-col w-full p-6">
        <PagesHeader
          title="مدیریت مجوزها"
          icon={<LuKey size={24} />}
          buttonLabel="افزودن مجوز"
          modalHandling={() => setOpenModal(true)}
        />
        <div className="flex flex-col w-full border border-gray-50 bg-white rounded-lg mt-4">
          <TablesHeader placeHolder="جستجو با نام مجوز" />
          <PermissionsTable data={mockPermission} />
        </div>
      </div>
    </>
  );
};

export default PermissionsMainPage;
