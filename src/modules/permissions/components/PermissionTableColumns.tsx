import type { Permission } from "../permissionTypes";
import type { Column } from "../../../components/tables";
import PermissionPopUpMenu from "./PermissionPopUpMenu";

export const columns: Column<Permission>[] = [
  {
    key: "id",
    title: "شناسه",
    dataIndex: "id",
    width: 80,
    align: "center",
  },
  {
    key: "name",
    title: "نام مجوز",
    dataIndex: "name",
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
    render: (_, row) => <PermissionPopUpMenu permission={row} />,
  },
];
