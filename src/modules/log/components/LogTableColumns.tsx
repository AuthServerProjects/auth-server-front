import type { Log } from "../logTypes";
import type { Column } from "../../../components/tables";
import Badge from "../../../components/Badge/Badge";

export const columns: Column<Log>[] = [
  {
    key: "id",
    title: "شناسه",
    dataIndex: "id",
    width: 80,
    align: "center",
  },
  {
    key: "user",
    title: "کاربر",
    dataIndex: "user",
  },
  {
    key: "action",
    title: "عملیات",
    dataIndex: "action",
  },
  {
    key: "IpAddress",
    title: "آدرس IP",
    dataIndex: "IpAddress",
    sortable: true,
  },
  {
    key: "time",
    title: "زمان",
    dataIndex: "time",
  },
  {
    key: "status",
    title: "وضعیت",
    dataIndex: "status",
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
    key: "details",
    title: "جزئیات",
    dataIndex: "details",
  },
];
