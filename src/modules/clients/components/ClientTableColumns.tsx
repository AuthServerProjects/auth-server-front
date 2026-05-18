import type { Client } from "../clientTypes";
import ClientActionsMenu from "./ClientActionsMenu";
import type { Column } from "../../../components/tables";

export const clientTableColumns: Column<Client>[] = [
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
    render: (_, row) => <ClientActionsMenu client={row} />,
  },
];
