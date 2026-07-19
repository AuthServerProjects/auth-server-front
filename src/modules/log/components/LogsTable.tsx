import { useState } from "react";

import type { Log } from "../logTypes";
import { columns } from "./LogTableColumns";
import Table, { type SortState } from "../../../components/tables";

type Props = {
  data: Log[];
  total: number;
  loading: boolean;
  page: number;
  onPageChange: (page: number) => void;
};

const LogsTableComponent = ({
  data,
  total,
  loading,
  page,
  onPageChange,
}: Props) => {
  const [sortBy, setSortBy] = useState<SortState>();

  return (
    <Table<Log>
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

export default LogsTableComponent;
