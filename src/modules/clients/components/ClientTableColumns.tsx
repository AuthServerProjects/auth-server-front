import type { Client } from "../clientTypes";
import Switch from "../../../components/Switch";
import ClientActionsMenu from "./ClientActionsMenu";
import type { Column } from "../../../components/tables";

export const getColumns = (
  onStatusChange: (id: number, checked: boolean) => void,
): Column<Client>[] => [
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
    render: (value: boolean, record) => (
      <Switch
        label={value ? "فعال" : "غیرفعال"}
        checked={value}
        onCheckedChange={(checked) => onStatusChange(record.id, checked)}
      />
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
