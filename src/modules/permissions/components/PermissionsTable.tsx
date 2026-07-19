import { useState } from "react";
import { getColumns } from "./PermissionTableColumns";
import type { Permission } from "../permissionTypes";
import Table, { type SortState } from "../../../components/tables";

type Props = {
  data: Permission[];
  total: number;
  loading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
};

const PermissionsTable = ({
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
    <Table<Permission>
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

export default PermissionsTable;
