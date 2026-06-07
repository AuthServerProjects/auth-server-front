import { LuPencil } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import type { Permission } from "../permissionTypes";
import { usePermissionActions } from "../hooks/usePermissionActions";
import type { PopUpMenuItem } from "../../../components/popUpMenu/types";
import PopUpMenu from "../../../components/popUpMenu/PopUpMenu";

type Props = {
  permission: Permission;
};

const PermissionPopUpMenu = ({ permission }: Props) => {
  const { handleEdit, handleRemove } = usePermissionActions();

  const items: PopUpMenuItem[] = [
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

  return <PopUpMenu items={items} />;
};

export default PermissionPopUpMenu;
