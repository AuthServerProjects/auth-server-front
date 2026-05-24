import { useState } from "react";
import type { Role } from "../roleTypes";
import { getColumns } from "./RoleTableColumns";
import Table, { type SortState } from "../../../components/tables";

type Props = {
  data: Role[];
};

const RolesTable = ({ data }: Props) => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortState>();
  const [roles, setRoles] = useState<Role[]>(data);

  const handleStatusChange = (id: number, checked: boolean) => {
    setRoles((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status: checked } : row)),
    );
    // TODO: API call here
    console.log("toggle", id, checked);
  };

  const columns = getColumns(handleStatusChange);

  return (
    <Table<Role>
      columns={columns}
      data={roles}
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

export default RolesTable;
