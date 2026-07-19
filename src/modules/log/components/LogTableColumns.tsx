import type { Log } from "../logTypes";
import Badge from "../../../components/Badge/Badge";
import type { Column } from "../../../components/tables";
import { renderDate } from "../../../utils/convertDateToPersian";

export const columns: Column<Log>[] = [
  {
    key: "id",
    title: "شناسه",
    dataIndex: "id",
    width: 80,
    align: "center",
  },
  {
    key: "username",
    title: "کاربر",
    dataIndex: "username",
  },
  {
    key: "action",
    title: "عملیات",
    dataIndex: "action",
  },
  {
    key: "ipAddress",
    title: "آدرس IP",
    dataIndex: "ipAddress",
    sortable: true,
  },
  {
    key: "createdAt",
    title: "زمان",
    dataIndex: "createdAt",
    render: (value) => renderDate(value),
  },
  {
    key: "success",
    title: "وضعیت",
    dataIndex: "success",
    render: (value) => (
      <Badge
        variant={value ? "success" : "danger"}
        label={value ? "موفق" : "ناموفق"}
      />
    ),
  },
  {
    key: "details",
    title: "جزئیات",
    dataIndex: "details",
  },
];
