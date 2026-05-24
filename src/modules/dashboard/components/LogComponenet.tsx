import { useState } from "react";
import Table, { type Column, type SortState } from "../../../components/tables";
import Badge from "../../../components/Badge/Badge";

type Log = {
  id: number;
  action: string;
  user: string;
  status: "Success" | "Failed";
  time: string;
};

const LogComponent = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortState>();

  const columns: Column<Log>[] = [
    {
      key: "id",
      title: "ردیف",
      dataIndex: "id",
      width: 80,
      align: "center",
    },
    {
      key: "action",
      title: "عملیات",
      dataIndex: "action",
      sortable: true,
    },
    {
      key: "user",
      title: "کاربر",
      dataIndex: "user",
    },
    {
      key: "status",
      title: "وضعیت",
      dataIndex: "status",
      align: "center",
      render: (value) => {
        const isSuccess = value === "Success";
        return (
          <Badge
            variant={isSuccess ? "success" : "danger"}
            label={isSuccess ? "موفق" : "ناموفق"}
          />
        );
      },
    },
    {
      key: "time",
      title: "زمان",
      dataIndex: "time",
    },
  ];

  const data: Log[] = [
    {
      id: 1,
      action: "ورود",
      user: "989331782513",
      status: "Success",
      time: "۱ دقیقه قبل",
    },
    {
      id: 2,
      action: "دریافت رمز",
      user: "989331782513",
      status: "Failed",
      time: "۱۰ دقیقه قبل",
    },
  ];

  return (
    <Table<Log>
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
      className="rounded-t-lg"
    />
  );
};

export default LogComponent;
