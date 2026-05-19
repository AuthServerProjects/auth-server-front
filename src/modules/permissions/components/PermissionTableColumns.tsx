import type { Permission } from "../permissionTypes";
import type { Column } from "../../../components/tables";
import PermissionActionsMenu from "./PermissionActionsMenu";

export const columns: Column<Permission>[] = [
  {
    key: "id",
    title: "شناسه",
    dataIndex: "id",
    width: 80,
    align: "center",
  },
  {
    key: "permissionName",
    title: "نام مجوز",
    dataIndex: "permissionName",
  },
  {
    key: "description",
    title: "توضیحات",
    dataIndex: "description",
  },
  {
    key: "action",
    title: "عملیات",
    align: "center",
    width: 100,
    render: (_, row) => <PermissionActionsMenu permission={row} />,
  },
];
