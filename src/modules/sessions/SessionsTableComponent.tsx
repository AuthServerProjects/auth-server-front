import { useState } from "react";
import Table, { type Column, type SortState } from "../../components/tables";

type User = {
  id: number;
  userName: string;
  client: string;
  status: "active" | "inactive";
  accessTokenIssuedAt: string;
  accessTokenExpiresAt: string;
  refreshTokenIssuedAt: string;
  refreshTokenExpiresAt: string;
};

const renderDate = (value: unknown) => {
  if (!value) return "-";
  return new Date(value as string).toLocaleString("fa-IR", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

const SessionsTableComponent = () => {
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
      key: "userName",
      title: "نام کاربری",
      dataIndex: "userName",
    },
    {
      key: "client",
      title: "کلاینت",
      dataIndex: "client",
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
      key: "accessTokenIssuedAt",
      title: "تاریخ صدور اکسس توکن",
      dataIndex: "accessTokenIssuedAt",
      render: renderDate,
    },
    {
      key: "accessTokenExpiresAt",
      title: "تاریخ انقضا اکسس توکن",
      dataIndex: "accessTokenExpiresAt",
      render: renderDate,
    },
    {
      key: "refreshTokenIssuedAt",
      title: "تاریخ صدور رفرش توکن",
      dataIndex: "refreshTokenIssuedAt",

      render: renderDate,
    },
    {
      key: "refreshTokenExpiresAt",
      title: "تاریخ انقضا رفرش توکن",
      dataIndex: "refreshTokenExpiresAt",
      render: renderDate,
    },
    {
      key: "actions",
      title: "عملیات",
    },
  ];

  const data: User[] = [
    {
      id: 1,
      userName: "Rosa.sh.7",
      client: "BNPL",
      status: "active",
      accessTokenIssuedAt: "2024-06-01T10:00:00Z",
      accessTokenExpiresAt: "2024-06-01T11:00:00Z",
      refreshTokenIssuedAt: "2024-06-01T10:00:00Z",
      refreshTokenExpiresAt: "2024-06-01T11:00:00Z",
    },
    {
      id: 2,
      userName: "Ramin.k.92",
      client: "MyBpm",
      status: "inactive",
      accessTokenIssuedAt: "2024-06-01T10:00:00Z",
      accessTokenExpiresAt: "2024-06-01T11:00:00Z",
      refreshTokenIssuedAt: "2024-06-01T10:00:00Z",
      refreshTokenExpiresAt: "2024-06-01T11:00:00Z",
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

export default SessionsTableComponent;
