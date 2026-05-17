import { useState } from "react";
import Table, { type Column, type SortState } from "../../components/tables";

type Role = {
  id: number;
  roleName: string;
  status: "active" | "inactive";
  permissions: [];
};

const RolesTableComponent = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortState>();

  const columns: Column<Role>[] = [
    {
      key: "id",
      title: "شناسه",
      dataIndex: "id",
      width: 80,
      align: "center",
    },
    {
      key: "roleName",
      title: "نام نقش",
      dataIndex: "roleName",
    },
    {
      key: "status",
      title: "وضعیت",
      dataIndex: "status",
      align: "center",
      render: (value) => (
        <span
          className={[
            "px-2 py-1 rounded-full text-xs",
            value === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700",
          ].join(" ")}
        >
          {value === "active" ? "فعال" : "غیرفعال"}
        </span>
      ),
    },
    {
      key: "permissions",
      title: "مجوزها",
      dataIndex: "permissions",
    },
  ];

  const data: Role[] = [
    {
      id: 1,
      roleName: "SUPER_ADMIN",
      status: "active",
      permissions: [],
    },
    {
      id: 2,
      roleName: "MANAGER",
      status: "inactive",
      permissions: [],
    },
  ];

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

export default RolesTableComponent;
