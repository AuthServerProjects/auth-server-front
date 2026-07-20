import { useState, useEffect, useCallback } from "react";
import { FiServer } from "react-icons/fi";

import type { Client } from "./clientTypes";
import { clientService } from "./clientService";
import ClientModal from "./components/ClientModal";
import ClientsTable from "./components/ClientsTable";
import PagesHeader from "../../components/PagesHeader";
import TablesHeader from "../../components/TablesHeader";

const ClientsMainPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [clients, setClients] = useState<Client[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const res = await clientService.findAll({
        pageNumber: page - 1,
        pageSize: 10,
        sortBy: "id",
        sortDirection: "ASC",
        filters: {},
      });
      setClients(res.content);
      setTotal(res.totalElements);
    } catch (err) {
      console.error("failed to load clients", err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return (
    <>
      {openModal && (
        <ClientModal
          isEdit={false}
          title="ایجاد کلاینت"
          onClose={() => setOpenModal(false)}
          onSaved={fetchClients}
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
          <ClientsTable
            data={clients}
            total={total}
            loading={loading}
            page={page}
            onPageChange={setPage}
            onRefresh={fetchClients}
          />
        </div>
      </div>
    </>
  );
};

export default ClientsMainPage;
