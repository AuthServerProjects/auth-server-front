import type { User } from "../userTypes";
import UserPopUpMenu from "./UserPopUpMenu";
import Switch from "../../../components/Switch";
import type { Column } from "../../../components/tables";

export const getColumns = (
  onStatusChange: (id: number, checked: boolean) => void,
  isFromClient: boolean,
): Column<User>[] => [
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
    render: (value, row) => (
      <Switch
        label={value ? "فعال" : "غیرفعال"}
        checked={value}
        onCheckedChange={(checked) => onStatusChange(row.id, checked)}
      />
    ),
  },
  {
    key: "roles",
    title: "نقش‌ها",
    dataIndex: "roles",
    render: (value) => {
      if (!value || value.length === 0) return "-";
      return value.join("، ");
    },
  },
  {
    key: "actions",
    title: "عملیات",
    align: "center",
    width: 100,
    render: (_, row) => (
      <UserPopUpMenu user={row} isFromClient={isFromClient} />
    ),
  },
];
