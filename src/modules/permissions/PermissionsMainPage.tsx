import { LuKey } from "react-icons/lu";
import { useState, useEffect, useCallback } from "react";

import type { Permission } from "./permissionTypes";
import PagesHeader from "../../components/PagesHeader";
import { permissionService } from "./permissionService";
import TablesHeader from "../../components/TablesHeader";
import PermissionModal from "./components/PermissionModal";
import PermissionsTable from "./components/PermissionsTable";
import { useSelectedClient } from "../../context/SelectedClientContext";

const PermissionsMainPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { selectedClient } = useSelectedClient();

  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchPermissions = useCallback(async () => {
    if (!selectedClient) {
      setPermissions([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    try {
      const res = await permissionService.findAll({
        pageNumber: page - 1,
        pageSize: 10,
        sortBy: "id",
        sortDirection: "ASC",
        filters: {},
      });
      setPermissions(res.content);
      setTotal(res.totalElements);
    } catch (err) {
      console.error("failed to load permissions", err);
    } finally {
      setLoading(false);
    }
  }, [page, selectedClient]);

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  return (
    <>
      {openModal && (
        <PermissionModal
          isEdit={false}
          title="ایجاد مجوز"
          onClose={() => setOpenModal(false)}
          onSaved={fetchPermissions}
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
          <PermissionsTable
            data={permissions}
            total={total}
            loading={loading}
            page={page}
            onPageChange={setPage}
            onRefresh={fetchPermissions}
          />
        </div>
      </div>
    </>
  );
};

export default PermissionsMainPage;
