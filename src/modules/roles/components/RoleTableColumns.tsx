import type { Role } from "../roleTypes";
import RolePopUpMenu from "./RolePopUpMenu";
import Switch from "../../../components/Switch";
import type { Column } from "../../../components/tables";

export const getColumns = (
  onStatusChange: (id: number) => void,
  onDeleted: () => void,
): Column<Role>[] => [
  {
    key: "id",
    title: "شناسه",
    dataIndex: "id",
    width: 80,
    align: "center",
  },
  {
    key: "name",
    title: "نام نقش",
    dataIndex: "name",
  },
  {
    key: "isEnabled",
    title: "وضعیت",
    dataIndex: "isEnabled",
    align: "center",
    render: (value, record) => (
      <Switch
        label={value ? "فعال" : "غیرفعال"}
        checked={value}
        onCheckedChange={() => onStatusChange(record.id)}
      />
    ),
  },
  {
    key: "permissions",
    title: "مجوزها",
    dataIndex: "permissions",
    render: (value) => (Array.isArray(value) ? value.length : 0),
  },
  {
    key: "action",
    title: "عملیات",
    align: "center",
    width: 100,
    render: (_, row) => <RolePopUpMenu role={row} onDeleted={onDeleted} />,
  },
];
