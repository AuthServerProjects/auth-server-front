import type { Role } from "../roleTypes";
import Switch from "../../../components/Switch";
import type { Column } from "../../../components/tables";

export const getColumns = (
  onStatusChange: (id: number, checked: boolean) => void,
): Column<Role>[] => [
  {
    key: "id",
    title: "شناسه",
    dataIndex: "id",
    width: 80,
    align: "center",
  },
  {
    key: "roleName",
    title: "نام نقش",
    dataIndex: "roleName",
  },
  {
    key: "status",
    title: "وضعیت",
    dataIndex: "status",
    align: "center",
    render: (value, record) => (
      <Switch
        label={value ? "فعال" : "غیرفعال"}
        checked={value}
        onCheckedChange={(checked) => onStatusChange(record.id, checked)}
      />
    ),
  },
  {
    key: "permissions",
    title: "مجوزها",
    dataIndex: "permissions",
  },
];
