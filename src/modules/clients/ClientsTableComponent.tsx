import { useState } from "react";
import Table, { type Column, type SortState } from "../../components/tables";

type Client = {
  id: number;
  clientId: string;
  permissions: string[];
  scopes: string[];
  status: "active" | "inactive";
  setting: string[];
};

const ClientsTableComponent = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortState>();

  const columns: Column<Client>[] = [
    {
      key: "id",
      title: "شناسه",
      dataIndex: "id",
      width: 80,
      align: "center",
    },
    {
      key: "clientId",
      title: "شناسه کلاینت",
      dataIndex: "clientId",
    },
    {
      key: "permissions",
      title: "مجوزها",
      dataIndex: "permissions",
    },
    {
      key: "scopes",
      title: "محدوده‌ها",
      dataIndex: "scopes",
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
      key: "setting",
      title: "تنظیمات",
      dataIndex: "setting",
    },
    {
      key: "actions",
      title: "عملیات",
    },
  ];

  const data: Client[] = [
    {
      id: 1,
      clientId: "BNPL",
      permissions: ["AUTHORIZATION CODE ", "REFRESH TOKEN"],
      scopes: ["profile", "email"],
      status: "active",
      setting: [],
    },
    {
      id: 2,
      clientId: "AdminPanel",
      permissions: ["AUTHORIZATION CODE"],
      scopes: ["openid"],
      status: "inactive",
      setting: [],
    },
  ];

  return (
    <Table<Client>
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

export default ClientsTableComponent;
