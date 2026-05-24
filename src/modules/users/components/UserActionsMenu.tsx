import type { User } from "../userTypes";
import { useUserActions } from "../hooks/useUserActions";
import ActionMenu from "../../../components/actionMenu/ActionMenu";
import { LuPencil, LuServer, LuShield, LuKey } from "react-icons/lu";
import type { ActionItem } from "../../../components/actionMenu/types";

type Props = {
  user: User;
};

const UserActionsMenu = ({ user }: Props) => {
  const {
    handleEdit,
    handleAssignClient,
    handleManageRoles,
    handleResetPassword,
  } = useUserActions();

  const items: ActionItem[] = [
    {
      key: "edit",
      label: "ویرایش",
      icon: <LuPencil />,
      onClick: () => handleEdit(user),
    },
    {
      key: "client",
      label: "تخصیص به کلاینت",
      icon: <LuServer />,
      onClick: () => handleAssignClient(user),
    },
    {
      key: "roles",
      label: "مدیریت نقش‌ها",
      icon: <LuShield />,
      onClick: () => handleManageRoles(user),
    },
    {
      key: "password",
      label: "بازنشانی رمز عبور",
      icon: <LuKey />,
      onClick: () => handleResetPassword(user),
    },
  ];

  return <ActionMenu items={items} />;
};

export default UserActionsMenu;
