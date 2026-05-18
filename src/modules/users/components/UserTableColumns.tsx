import type { Column } from "../../../components/tables";
import type { User } from "../userTypes";
import Badge from "../../../components/Badge/Badge";
import UserActionsMenu from "./UserActionsMenu";

export const userColumns: Column<User>[] = [
  { key: "id", title: "شناسه", dataIndex: "id", width: 80, align: "center" },
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
    render: (value) => <Badge type="status" value={value as User["status"]} />,
  },
  {
    key: "roles",
    title: "نقش‌ها",
    dataIndex: "roles",
    render: (value) => {
      const roles = (value as string[]) ?? [];
      if (roles.length === 0) return "-";
      return roles.join("، ");
    },
  },
  {
    key: "actions",
    title: "عملیات",
    align: "center",
    width: 100,
    render: (_, row) => <UserActionsMenu user={row} />,
  },
];
