import { useState } from "react";

import type { Session } from "../sessionTypes";
import { getColumns } from "./SessionTableColumns";
import Table, { type SortState } from "../../../components/tables";

type Props = {
  data: Session[];
  total: number;
  loading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
};

const SessionsTableComponent = ({
  data,
  total,
  loading,
  page,
  onPageChange,
  onRefresh,
}: Props) => {
  const [sortBy, setSortBy] = useState<SortState>();

  const columns = getColumns(onRefresh);

  return (
    <Table<Session>
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

export default SessionsTableComponent;
