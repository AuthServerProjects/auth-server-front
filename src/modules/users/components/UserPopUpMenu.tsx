import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuUserPen, LuUserCog, LuServer } from "react-icons/lu";

import type { UserRow } from "../userRow";
import UserModal from "./modals/UserModal";
import { userService } from "../generalUser/userService";
import ManageRolesModal from "./modals/ManageRolesModal";
import AssignClientModal from "./modals/AssignClientModal";
import ConfirmDialog from "../../../components/ConfirmDialog";
import PopUpMenu from "../../../components/popUpMenu/PopUpMenu";
import { userClientService } from "../userClient/userClientService";
import type { PopUpMenuItem } from "../../../components/popUpMenu/types";

type ModalAction = {
  type: "editUser" | "assignClient" | "manageRoles" | "unassignFromClient";
  user: UserRow;
} | null;

type Props = {
  user: UserRow;
  isFromClient: boolean;
  onRefresh: () => void;
};

const UserPopUpMenu = ({ user, isFromClient, onRefresh }: Props) => {
  const [openModal, setOpenModal] = useState<ModalAction>(null);
  const [loading, setLoading] = useState(false);
  const close = () => setOpenModal(null);

  // general: delete global user  |  per-client: unassign membership
  const handleRemove = async () => {
    if (!openModal) return;
    setLoading(true);
    try {
      if (isFromClient) {
        await userClientService.delete(openModal.user.id);
      } else {
        await userService.delete(openModal.user.id);
      }
      close();
      onRefresh();
    } catch (err) {
      console.error("remove failed", err);
    } finally {
      setLoading(false);
    }
  };

  const items: PopUpMenuItem[] = [
    {
      key: "edit",
      label: "ویرایش",
      icon: <LuUserPen size={24} />,
      onClick: () => setOpenModal({ type: "editUser", user }),
    },
    ...(!isFromClient
      ? [
          {
            key: "client",
            label: "تخصیص به کلاینت",
            icon: <LuServer />,
            onClick: () => setOpenModal({ type: "assignClient", user }),
          },
        ]
      : []),
    ...(isFromClient
      ? [
          {
            key: "roles",
            label: "مدیریت نقش‌ها",
            icon: <LuUserCog size={24} />,
            onClick: () => setOpenModal({ type: "manageRoles", user }),
          },
        ]
      : []),
    {
      key: isFromClient ? "unassignFromClient" : "removeUser",
      label: isFromClient ? "حذف کاربر از کلاینت" : "حذف کاربر",
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
          onSaved={onRefresh}
          user={openModal.user}
          title="ویرایش کاربر"
          isFromClient={isFromClient}
        />
      )}

      {openModal?.type === "assignClient" && (
        <AssignClientModal
          userId={openModal.user.id}
          onClose={close}
          onSaved={onRefresh}
        />
      )}

      {openModal?.type === "manageRoles" && (
        <ManageRolesModal
          userClientId={openModal.user.id}
          onClose={close}
          onSaved={onRefresh}
        />
      )}

      {openModal?.type === "unassignFromClient" && (
        <ConfirmDialog
          open
          variant="danger"
          loading={loading}
          title={isFromClient ? "حذف کاربر از کلاینت جاری" : "حذف کاربر"}
          description={
            <>
              آیا از حذف کاربر <strong>{openModal.user.username}</strong>{" "}
              {isFromClient ? "از کلاینت جاری " : ""}مطمئن هستید؟
            </>
          }
          confirmText="حذف"
          onConfirm={handleRemove}
          onClose={close}
        />
      )}
    </>
  );
};

export default UserPopUpMenu;
