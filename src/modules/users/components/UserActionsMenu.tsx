import { useState } from "react";
import { LuPencil, LuServer, LuShield } from "react-icons/lu";

import UserModal from "./modals/UserModal";
import type { User } from "../userTypes";
import ManageRolesModal from "./modals/ManageRolesModal";
import AssignClientModal from "./modals/AssignClientModal";
import ConfirmDialog from "../../../components/ConfirmDialog";
import ActionMenu from "../../../components/actionMenu/ActionMenu";
import type { ActionItem } from "../../../components/actionMenu/types";

type ModalType =
  | "editUser"
  | "assignClient"
  | "manageRoles"
  | "unassignFromClient";

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

  const handleUnassign = () => {
    console.log("unassigned!", openModal?.user.id);
    // TODO: API call
    close();
  };

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
    {
      key: "unassignFromClient",
      label: "حذف کاربر از کلاینت",
      icon: <LuShield />,
      onClick: () => setOpenModal({ type: "unassignFromClient", user }),
      danger: true,
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

      {openModal?.type === "unassignFromClient" && (
        <ConfirmDialog
          open
          variant="danger"
          title="حذف کاربر از کلاینت جاری"
          description={
            <>
              آیا از حذف کاربر <strong>{openModal.user.userName}</strong> از
              کلاینت جاری مطمئن هستید؟
            </>
          }
          confirmText="حذف"
          onConfirm={handleUnassign}
          onClose={close}
        />
      )}
    </>
  );
};

export default UserActionsMenu;
