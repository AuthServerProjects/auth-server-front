import { LuRefreshCcw } from "react-icons/lu";
import { CgFileDocument } from "react-icons/cg";
import { useState, useEffect, useCallback } from "react";

import type { Log } from "./logTypes";
import { logService } from "./logService";
import LogsTable from "./components/LogsTable";
import PagesHeader from "../../components/PagesHeader";
import TablesHeader from "../../components/TablesHeader";
import { useSelectedClient } from "../../context/SelectedClientContext";

const LogsMainPage = () => {
  const { selectedClient } = useSelectedClient();

  const [logs, setLogs] = useState<Log[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchLogs = useCallback(async () => {
    if (!selectedClient) {
      setLogs([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    try {
      const res = await logService.findAll({
        pageNumber: page - 1,
        pageSize: 10,
        sortBy: "createdAt",
        sortDirection: "DESC",
        filters: {},
      });
      setLogs(res.content);
      setTotal(res.totalElements);
    } catch (err) {
      console.error("failed to load logs", err);
    } finally {
      setLoading(false);
    }
  }, [page, selectedClient]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <div className="flex flex-col w-full p-6">
      <PagesHeader
        title="مدیریت لاگها"
        icon={<CgFileDocument size={24} />}
        buttonLabel="بازخوانی"
        buttonIcon={<LuRefreshCcw size={20} />}
        modalHandling={fetchLogs}
      />
      <div className="flex flex-col w-full border border-gray-50 bg-white rounded-lg mt-4">
        <TablesHeader placeHolder="جستجو با نام کاربر یا عملیات" />
        <LogsTable
          data={logs}
          total={total}
          loading={loading}
          page={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default LogsMainPage;
