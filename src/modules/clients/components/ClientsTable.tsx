import { useState } from "react";

import type { Client } from "../clientTypes";
import { clientService } from "../clientService";
import { getColumns } from "./ClientTableColumns";
import Table, { type SortState } from "../../../components/tables";

type Props = {
  data: Client[];
  total: number;
  loading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
};

const ClientsTable = ({
  data,
  total,
  loading,
  page,
  onPageChange,
  onRefresh,
}: Props) => {
  const [sortBy, setSortBy] = useState<SortState>();

  const handleStatusChange = async (clientId: string) => {
    try {
      await clientService.toggleStatus(clientId);
      onRefresh();
    } catch (err) {
      console.error("toggle failed", err);
    }
  };

  const columns = getColumns(handleStatusChange, onRefresh);

  return (
    <Table<Client>
      columns={columns}
      data={data}
      rowKey="id"
      striped
      loading={loading}
      sortBy={sortBy}
      onSortChange={setSortBy}
      onRowClick={(row) => console.log("clicked", row)}
      pagination={{
        page,
        pageSize: 10,
        total,
        onChange: onPageChange,
        showSizeChanger: true,
        onPageSizeChange: (s) => console.log(s),
      }}
    />
  );
};

export default ClientsTable;
