import { useState } from "react";
import { LuPencil } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

import type { Permission } from "../permissionTypes";
import ConfirmDialog from "../../../components/ConfirmDialog";
import PopUpMenu from "../../../components/popUpMenu/PopUpMenu";
import type { PopUpMenuItem } from "../../../components/popUpMenu/types";
import PermissionModal from "./PermissionModal";

type ModalType = "editPermission" | "removePermission";

type ModalAction = {
  type: ModalType;
  permission: Permission;
} | null;

type Props = {
  permission: Permission;
};

const PermissionPopUpMenu = ({ permission }: Props) => {
  const [openModal, setOpenModal] = useState<ModalAction>(null);
  const close = () => setOpenModal(null);

  const handleRemove = () => {
    console.log("remove permission!", openModal?.permission.id);
    // TODO: API call
    close();
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
        />
      )}
      {openModal?.type === "removePermission" && (
        <ConfirmDialog
          open
          variant="danger"
          title="حذف مجوز"
          description={
            <p>
              آیا از حذف مجوز{" "}
              <strong>{openModal.permission.permissionName}</strong> مطمئن
              هستید؟
            </p>
          }
          confirmText="حذف"
          onConfirm={handleRemove}
          onClose={close}
        />
      )}
    </>
  );
};

export default PermissionPopUpMenu;
