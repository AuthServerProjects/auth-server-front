import type { UserRow } from "../userRow";
import UserPopUpMenu from "./UserPopUpMenu";
import Switch from "../../../components/Switch";
import type { Column } from "../../../components/tables";

export const getColumns = (
  onStatusChange: (row: UserRow, checked: boolean) => void,
  isFromClient: boolean,
  onRefresh: () => void,
): Column<UserRow>[] => [
  {
    key: "id",
    title: "شناسه",
    dataIndex: "id",
    width: 80,
    align: "center",
  },
  {
    key: "username",
    title: "نام کاربری",
    dataIndex: "username",
    sortable: true,
  },
  {
    key: "phoneNumber",
    title: "شماره همراه",
    dataIndex: "phoneNumber",
  },
  {
    key: "isEnabled",
    title: "وضعیت",
    dataIndex: "isEnabled",
    align: "center",
    render: (value, row) => (
      <Switch
        label={value ? "فعال" : "غیرفعال"}
        checked={value}
        onCheckedChange={(checked) => onStatusChange(row, checked)}
      />
    ),
  },
  ...(isFromClient
    ? [
        {
          key: "roles",
          title: "نقش‌ها",
          dataIndex: "roles",
          render: (value: string[] | undefined) =>
            !value || value.length === 0 ? "-" : value.join("، "),
        } as Column<UserRow>,
      ]
    : []),
  {
    key: "actions",
    title: "عملیات",
    align: "center",
    width: 100,
    render: (_, row) => (
      <UserPopUpMenu
        user={row}
        isFromClient={isFromClient}
        onRefresh={onRefresh}
      />
    ),
  },
];
