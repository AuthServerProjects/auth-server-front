import { useState } from "react";
import Table, { type Column, type SortState } from "../../components/tables";

type User = {
  id: number;
  time: string;
  action: string;
  user: string;
  IpAddress: string;
  status: "success" | "unsuccess";
  details: string;
};

const LogsTableComponent = () => {
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
      key: "time",
      title: "زمان",
      dataIndex: "time",
    },
    {
      key: "action",
      title: "عملیات",
      dataIndex: "action",
    },
    {
      key: "user",
      title: "کاربر",
      dataIndex: "user",
    },
    {
      key: "IpAddress",
      title: "آدرس IP",
      dataIndex: "IpAddress",
      sortable: true,
    },
    {
      key: "details",
      title: "جزئیات",
      dataIndex: "details",
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
            value === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700",
          ].join(" ")}
        >
          {value === "success" ? "موفق" : "ناموفق"}
        </span>
      ),
    },
  ];

  const data: User[] = [
    {
      id: 1,
      time: "2023-10-01 10:00:00",
      action: "Login",
      user: "admin",
      IpAddress: "192.168.1.1",
      status: "success",
      details: "User logged in successfully",
    },
    {
      id: 2,
      time: "2023-10-01 11:00:00",
      action: "Logout",
      user: "admin",
      IpAddress: "192.168.1.1",
      status: "unsuccess",
      details: "User logged out successfully",
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

export default LogsTableComponent;
