import { useState } from "react";
import { LuPencil, LuServer, LuShield } from "react-icons/lu";

import UserModal from "./UserModal";
import type { User } from "../userTypes";
import ManageRolesModal from "./ManageRolesModal";
import AssignClientModal from "./AssignClientModal";
import ActionMenu from "../../../components/actionMenu/ActionMenu";
import type { ActionItem } from "../../../components/actionMenu/types";

type ModalType = "editUser" | "assignClient" | "manageRoles";

type ModalAction = {
  type: ModalType;
  user: User;
} | null;

type Props = {
  user: User;
};

const UserActionsMenu = ({ user }: Props) => {
  const [openModal, setOpenModal] = useState<ModalAction>(null);
  const close = () => setOpenModal(null);

  const items: ActionItem[] = [
    {
      key: "edit",
      label: "ویرایش",
      icon: <LuPencil />,
      onClick: () => setOpenModal({ type: "editUser", user }),
    },
    {
      key: "client",
      label: "تخصیص به کلاینت",
      icon: <LuServer />,
      onClick: () => setOpenModal({ type: "assignClient", user }),
    },
    {
      key: "roles",
      label: "مدیریت نقش‌ها",
      icon: <LuShield />,
      onClick: () => setOpenModal({ type: "manageRoles", user }),
    },
  ];

  return (
    <>
      <ActionMenu items={items} />

      {openModal?.type === "editUser" && (
        <UserModal
          isEdit
          onClose={close}
          user={openModal.user}
          title="ویرایش کاربر"
        />
      )}
      {openModal?.type === "assignClient" && (
        <AssignClientModal
          userId={openModal.user.id}
          clientId={0}
          onClose={close}
        />
      )}
      {openModal?.type === "manageRoles" && (
        <ManageRolesModal userId={openModal.user.id} onClose={close} />
      )}
    </>
  );
};

export default UserActionsMenu;
