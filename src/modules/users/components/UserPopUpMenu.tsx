import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuUserPen, LuUserCog, LuServer } from "react-icons/lu";

import type { User } from "../userTypes";
import UserModal from "./modals/UserModal";
import ManageRolesModal from "./modals/ManageRolesModal";
import AssignClientModal from "./modals/AssignClientModal";
import ConfirmDialog from "../../../components/ConfirmDialog";
import PopUpMenu from "../../../components/popUpMenu/PopUpMenu";
import type { PopUpMenuItem } from "../../../components/popUpMenu/types";

type ModalAction = {
  type: "editUser" | "assignClient" | "manageRoles" | "unassignFromClient";
  user: User;
} | null;

type Props = {
  user: User;
};

const UserPopUpMenu = ({ user }: Props) => {
  const [openModal, setOpenModal] = useState<ModalAction>(null);
  const close = () => setOpenModal(null);

  const handleUnassign = () => {
    console.log("unassigned!", openModal?.user.id);
    // TODO: API call
    close();
  };

  const items: PopUpMenuItem[] = [
    {
      key: "edit",
      label: "ویرایش",
      icon: <LuUserPen size={24} />,
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
      icon: <LuUserCog size={24} />,
      onClick: () => setOpenModal({ type: "manageRoles", user }),
    },
    {
      key: "unassignFromClient",
      label: "حذف کاربر از کلاینت",
      icon: <RiDeleteBin6Line />,
      onClick: () => setOpenModal({ type: "unassignFromClient", user }),
      danger: true,
    },
  ];

  return (
    <>
      <PopUpMenu items={items} />

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

export default UserPopUpMenu;
