import { useState } from "react";

import type { User } from "../userTypes";
import { getColumns } from "./UserTableColumns";
import Table, { type SortState } from "../../../components/tables";

type Props = {
  data: User[];
  isFromClient: boolean;
};

const UsersTable = ({ data, isFromClient }: Props) => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortState>();
  const [users, setUsers] = useState<User[]>(data);

  const handleStatusChange = (id: number, checked: boolean) => {
    setUsers((prev) =>
      prev.map((row) => (row.id === id ? { ...row, status: checked } : row)),
    );
    // TODO: API call here
    console.log("toggle", id, checked);
  };

  const columns = getColumns(handleStatusChange, isFromClient);

  return (
    <Table<User>
      columns={columns}
      data={users}
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

export default UsersTable;
