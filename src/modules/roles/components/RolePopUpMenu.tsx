import { LuPencil } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

import type { Role } from "../roleTypes";
import { useRoleActions } from "../hooks/useRoleActions";
import PopUpMenu from "../../../components/popUpMenu/PopUpMenu";
import type { PopUpMenuItem } from "../../../components/popUpMenu/types";

type Props = {
  role: Role;
};

const RolePopUpMenu = ({ role }: Props) => {
  const { handleEdit, handleRemove } = useRoleActions();

  const items: PopUpMenuItem[] = [
    {
      key: "edit",
      label: "ویرایش",
      icon: <LuPencil />,
      onClick: () => handleEdit(role),
    },
    {
      key: "remove",
      label: "حذف",
      icon: <RiDeleteBin6Line />,
      onClick: () => handleRemove(role),
      danger: true,
    },
  ];

  return <PopUpMenu items={items} />;
};

export default RolePopUpMenu;
