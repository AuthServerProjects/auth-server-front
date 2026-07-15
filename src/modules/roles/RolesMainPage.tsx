import { LuUserCog } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import type { Role } from "./roleTypes";
import { roleService } from "./roleService";
import RolesTable from "./components/RolesTable";
import PagesHeader from "../../components/PagesHeader";
import TablesHeader from "../../components/TablesHeader";
import { useSelectedClient } from "../../context/SelectedClientContext";

const RolesMainPage = () => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState<Role[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { selectedClient } = useSelectedClient();

  const fetchRoles = useCallback(async () => {
    if (!selectedClient) {
      setRoles([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    try {
      const res = await roleService.findAll({
        pageNumber: page - 1,
        pageSize: 10,
        sortBy: "id",
        sortDirection: "ASC",
        filters: {},
      });
      setRoles(res.content);
      setTotal(res.totalElements);
    } catch (err) {
      console.error("failed to load roles", err);
    } finally {
      setLoading(false);
    }
  }, [page, selectedClient]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

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
        <RolesTable
          data={roles}
          total={total}
          loading={loading}
          page={page}
          onPageChange={setPage}
          onRefresh={fetchRoles}
        />
      </div>
    </div>
  );
};

export default RolesMainPage;
