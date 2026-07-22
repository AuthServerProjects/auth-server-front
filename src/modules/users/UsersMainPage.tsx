import { FiUsers } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import type { UserRow } from "./userRow";
import UsersTable from "./components/UsersTable";
import UserModal from "./components/modals/UserModal";
import PagesHeader from "../../components/PagesHeader";
import { userService } from "./generalUser/userService";
import TablesHeader from "../../components/TablesHeader";
import AddUserModal from "./components/modals/AddUserModal";
import { mapUserToRow, mapUserClientToRow } from "./userRow";
import { userClientService } from "./userClient/userClientService";
import { useSelectedClient } from "../../context/SelectedClientContext";

type ActiveModal = "search" | "create" | null;

const UsersMainPage = () => {
  const [searchParams] = useSearchParams();
  const isFromClient = searchParams.get("isFromClient") === "true";
  const { selectedClient } = useSelectedClient();

  const [rows, setRows] = useState<UserRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [active, setActive] = useState<ActiveModal>(null);

  const fetchUsers = useCallback(async () => {
    // per-client view needs a selected client (header-scoped)
    if (isFromClient && !selectedClient) {
      setRows([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    try {
      const req = {
        pageNumber: page - 1,
        pageSize: 10,
        sortBy: "id",
        sortDirection: "ASC" as const,
        filters: {},
      };
      if (isFromClient) {
        const res = await userClientService.findAll(req);
        setRows(res.content.map(mapUserClientToRow));
        setTotal(res.totalElements);
      } else {
        const res = await userService.findAll(req);
        setRows(res.content.map(mapUserToRow));
        setTotal(res.totalElements);
      }
    } catch (err) {
      console.error("failed to load users", err);
    } finally {
      setLoading(false);
    }
  }, [isFromClient, selectedClient, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      {active === "search" && (
        <AddUserModal
          title="افزودن کاربر"
          onClose={() => setActive(null)}
          onAddNew={() => setActive("create")}
          onSaved={() => {
            setActive(null);
            fetchUsers();
          }}
        />
      )}

      {active === "create" && (
        <UserModal
          isEdit={false}
          title="ایجاد کاربر"
          onClose={() => setActive(null)}
          onCancel={() => setActive(isFromClient ? "search" : null)}
          isFromClient={isFromClient}
          onSaved={() => {
            setActive(null);
            fetchUsers();
          }}
        />
      )}

      <div className="flex flex-col w-full p-6">
        <PagesHeader
          title="مدیریت کاربران"
          icon={<FiUsers size={24} />}
          buttonLabel="افزودن کاربر"
          modalHandling={() => setActive(isFromClient ? "search" : "create")}
        />

        <div className="flex flex-col w-full border border-gray-50 bg-white rounded-lg mt-4">
          <TablesHeader placeHolder="جستجو با نام کاربری" />
          <UsersTable
            data={rows}
            total={total}
            loading={loading}
            page={page}
            isFromClient={isFromClient}
            onPageChange={setPage}
            onRefresh={fetchUsers}
          />
        </div>
      </div>
    </>
  );
};

export default UsersMainPage;
