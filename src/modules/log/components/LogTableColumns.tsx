import type { Log } from "../logTypes";
import type { Column } from "../../../components/tables";

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
    align: "center",
    // render: (value) => <Badge type="status" value={value as Log["status"]} />,
  },
  {
    key: "details",
    title: "جزئیات",
    dataIndex: "details",
  },
];