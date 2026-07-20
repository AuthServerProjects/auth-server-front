import { LuRefreshCcw } from "react-icons/lu";
import { useState, useEffect, useCallback } from "react";

import type { Session } from "./sessionTypes";
import { sessionService } from "./sessionService";
import PagesHeader from "../../components/PagesHeader";
import SessionsTable from "./components/SessionsTable";
import TablesHeader from "../../components/TablesHeader";
import { useSelectedClient } from "../../context/SelectedClientContext";

const SessionsMainPage = () => {
  const { selectedClient } = useSelectedClient();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchSessions = useCallback(async () => {
    if (!selectedClient) {
      setSessions([]);
      setTotal(0);
      return;
    }
    setLoading(true);
    try {
      const res = await sessionService.findAll({
        pageNumber: page - 1,
        pageSize: 10,
        sortBy: "id",
        sortDirection: "DESC",
        filters: {},
      });
      setSessions(res.content);
      setTotal(res.totalElements);
    } catch (err) {
      console.error("failed to load sessions", err);
    } finally {
      setLoading(false);
    }
  }, [page, selectedClient]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return (
    <div className="flex flex-col w-full p-6">
      <PagesHeader
        title="مدیریت نشست‌ها"
        icon={<LuRefreshCcw size={24} />}
        buttonLabel="بازخوانی"
        buttonIcon={<LuRefreshCcw size={20} />}
        modalHandling={fetchSessions}
      />
      <div className="flex flex-col w-full border border-gray-50 bg-white rounded-lg mt-4">
        <TablesHeader placeHolder="جستجو با نام کاربری" />
        <SessionsTable
          data={sessions}
          total={total}
          loading={loading}
          page={page}
          onPageChange={setPage}
          onRefresh={fetchSessions}
        />
      </div>
    </div>
  );
};

export default SessionsMainPage;
