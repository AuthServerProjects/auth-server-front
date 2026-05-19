import { LuPencil } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import type { Permission } from "../permissionTypes";
import ActionMenu from "../../../components/actionMenu/ActionMenu";
import { usePermissionActions } from "../hooks/usePermissionActions";
import type { ActionItem } from "../../../components/actionMenu/types";

type Props = {
  permission: Permission;
};

const UserActionsMenu = ({ permission }: Props) => {
  const { handleEdit, handleRemove } = usePermissionActions();

  const items: ActionItem[] = [
    {
      key: "edit",
      label: "ویرایش",
      icon: <LuPencil />,
      onClick: () => handleEdit(permission),
    },
    {
      key: "remove",
      label: "حذف",
      icon: <RiDeleteBin6Line />,
      onClick: () => handleRemove(permission),
      danger: true,
    },
  ];

  return <ActionMenu items={items} />;
};

export default UserActionsMenu;
