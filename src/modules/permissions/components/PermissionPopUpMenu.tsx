import { useState } from "react";
import { LuPencil } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

import type { Permission } from "../permissionTypes";
import { permissionService } from "../permissionService";
import ConfirmDialog from "../../../components/ConfirmDialog";
import PopUpMenu from "../../../components/popUpMenu/PopUpMenu";
import type { PopUpMenuItem } from "../../../components/popUpMenu/types";
import PermissionModal from "./PermissionModal";

type ModalAction = {
  type: "editPermission" | "removePermission";
  permission: Permission;
} | null;

type Props = {
  permission: Permission;
  onChanged?: () => void;
};

const PermissionPopUpMenu = ({ permission, onChanged }: Props) => {
  const [openModal, setOpenModal] = useState<ModalAction>(null);
  const [deleting, setDeleting] = useState(false);
  const close = () => setOpenModal(null);

  const handleRemove = async () => {
    if (!openModal) return;
    setDeleting(true);
    try {
      await permissionService.delete(openModal.permission.id);
      close();
      onChanged?.();
    } catch (err) {
      console.error("remove permission failed", err);
    } finally {
      setDeleting(false);
    }
  };

  const items: PopUpMenuItem[] = [
    {
      key: "edit",
      label: "ویرایش",
      icon: <LuPencil />,
      onClick: () => setOpenModal({ type: "editPermission", permission }),
    },
    {
      key: "remove",
      label: "حذف",
      icon: <RiDeleteBin6Line />,
      onClick: () => setOpenModal({ type: "removePermission", permission }),
      danger: true,
    },
  ];

  return (
    <>
      <PopUpMenu items={items} />
      {openModal?.type === "editPermission" && (
        <PermissionModal
          isEdit
          onClose={close}
          permission={openModal.permission}
          title="ویرایش مجوز"
          onSaved={onChanged}
        />
      )}
      {openModal?.type === "removePermission" && (
        <ConfirmDialog
          open
          variant="danger"
          title="حذف مجوز"
          description={
            <p>
              آیا از حذف مجوز <strong>{openModal.permission.name}</strong> مطمئن
              هستید؟
            </p>
          }
          confirmText={deleting ? "در حال حذف..." : "حذف"}
          onConfirm={handleRemove}
          onClose={close}
        />
      )}
    </>
  );
};

export default PermissionPopUpMenu;
