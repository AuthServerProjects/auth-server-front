import { useState } from "react";
import type { Role } from "../roleTypes";
import { columns } from "./RoleTableColumns";
import Table, { type SortState } from "../../../components/tables";

type Props = {
  data: Role[];
};

const RolesTable = ({ data }: Props) => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortState>();

  return (
    <Table<Role>
      columns={columns}
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

export default RolesTable;
