import { useState } from "react";
import Table, { type Column, type SortState } from "../../components/tables";

type User = {
  id: number;
  permissionName: string;
  description: string;
};

const PermissionsTableComponent = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortState>();

  const columns: Column<User>[] = [
    {
      key: "id",
      title: "شناسه",
      dataIndex: "id",
      width: 80,
      align: "center",
    },
    {
      key: "permissionName",
      title: "نام مجوز",
      dataIndex: "permissionName",
    },
    {
      key: "description",
      title: "توضیحات",
      dataIndex: "description",
    },
    {
      key: "action",
      title: "عملیات",
    },
  ];

  const data: User[] = [
    {
      id: 1,
      permissionName: "role:create",
      description: "Create roles",
    },
    {
      id: 2,
      permissionName: "role:delete",
      description: "Delete roles",
    },
  ];

  return (
    <Table<User>
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

export default PermissionsTableComponent;
