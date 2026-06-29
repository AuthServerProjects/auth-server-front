import { useState } from "react";

import type { Client } from "../clientTypes";
import  { getColumns } from "./ClientTableColumns";
import Table, { type SortState } from "../../../components/tables";

type Props = {
  data: Client[];
};

const ClientsTable = ({ data }: Props) => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortState>();
  const [clients, setClients] = useState<Client[]>(data);
  
    const handleStatusChange = (id: number, checked: boolean) => {
      setClients((prev) =>
        prev.map((row) => (row.id === id ? { ...row, status: checked } : row)),
      );
      // TODO: API call here
      console.log("toggle", id, checked);
    };

      const columns = getColumns(handleStatusChange);
    

  return (
    <Table<Client>
      columns={columns}
      data={clients}
      rowKey="id"
      striped
      sortBy={sortBy}
      onSortChange={setSortBy}
      onRowClick={(row) => console.log("clicked", row)}
      pagination={{
        page,
        pageSize: 10,
        total: 42,
        onChange: setPage,
        showSizeChanger: true,
        onPageSizeChange: (s) => console.log(s),
      }}
    />
  );
};

export default ClientsTable;
