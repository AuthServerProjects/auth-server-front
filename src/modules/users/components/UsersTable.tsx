import { useState } from "react";
import Table, { type SortState } from "../../../components/tables";
import type { User } from "../types";
import { userColumns } from "./columns";

type Props = {
  data: User[];
};

const UsersTable = ({ data }: Props) => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortState>();

  return (
    <Table<User>
      columns={userColumns}
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

export default UsersTable;
