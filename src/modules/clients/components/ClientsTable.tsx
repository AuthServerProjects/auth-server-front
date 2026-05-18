import { useState } from "react";
import Table, { type SortState } from "../../../components/tables";
import type { Client } from "../types";
import { clientColumns } from "./Columns";

type Props = {
  data: Client[];
};

const ClientsTable = ({ data }: Props) => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortState>();

  return (
    <Table<Client>
      columns={clientColumns}
      data={data}
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
