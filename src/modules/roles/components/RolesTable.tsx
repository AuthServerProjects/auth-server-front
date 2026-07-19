import { useState } from "react";
import type { Role } from "../roleTypes";
import { roleService } from "../roleService";
import { getColumns } from "./RoleTableColumns";
import Table, { type SortState } from "../../../components/tables";

type Props = {
  data: Role[];
  total: number;
  loading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
};

const RolesTable = ({
  data,
  total,
  loading,
  page,
  onPageChange,
  onRefresh,
}: Props) => {
  const [sortBy, setSortBy] = useState<SortState>();

  const handleStatusChange = async (id: number) => {
    try {
      await roleService.toggleStatus(id);
      onRefresh();
    } catch (err) {
      console.error("toggle failed", err);
    }
  };

  const columns = getColumns(handleStatusChange, onRefresh);

  return (
    <Table<Role>
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

export default RolesTable;
