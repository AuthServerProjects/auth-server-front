import { useState } from "react";
import Table, { type Column, type SortState } from "../../components/tables";

type User = {
  id: number;
  userName: string;
  phoneNumber: string;
  status: "active" | "inactive";
  roles: [];
};

const UserComponent = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortState>();

  const columns: Column<User>[] = [
    {
      key: "id",
      title: "ردیف",
      dataIndex: "id",
      width: 80,
      align: "center",
    },
    {
      key: "userName",
      title: "نام کاربری",
      dataIndex: "userName",
      sortable: true,
    },
    {
      key: "phoneNumber",
      title: "شماره همراه",
      dataIndex: "phoneNumber",
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
      key: "roles",
      title: "نقش‌ها",
      dataIndex: "roles",
    },
  ];

  const data: User[] = [
    {
      id: 1,
      userName: "Rosa.sh.7",
      phoneNumber: "989331782513",
      status: "active",
      roles: [],
    },
    {
      id: 2,
      userName: "Ramin.k.92",
      phoneNumber: "989331782513",
      status: "inactive",
      roles: [],
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

export default UserComponent;
