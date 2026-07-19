import { useState } from "react";
import { LuPencil } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

import type { Role } from "../roleTypes";
import { roleService } from "../roleService";
import ConfirmDialog from "../../../components/ConfirmDialog";
import PopUpMenu from "../../../components/popUpMenu/PopUpMenu";
import type { PopUpMenuItem } from "../../../components/popUpMenu/types";

type ModalAction = {
  type: "removeRole";
  role: Role;
} | null;

type Props = {
  role: Role;
  onDeleted?: () => void;
};

const RolePopUpMenu = ({ role, onDeleted }: Props) => {
  const [openModal, setOpenModal] = useState<ModalAction>(null);
  const [deleting, setDeleting] = useState(false);
  const close = () => setOpenModal(null);

  const navigate = useNavigate();

  const handleRemove = async () => {
    if (!openModal) return;
    setDeleting(true);
    try {
      await roleService.delete(openModal.role.id);
      close();
      onDeleted?.();
    } catch (err) {
      console.error("remove role failed", err);
    } finally {
      setDeleting(false);
    }
  };

  const items: PopUpMenuItem[] = [
    {
      key: "edit",
      label: "ویرایش",
      icon: <LuPencil />,
      onClick: () => navigate(`/role/edit`, { state: { role } }),
    },
    {
      key: "remove",
      label: "حذف",
      icon: <RiDeleteBin6Line />,
      onClick: () => setOpenModal({ type: "removeRole", role }),
      danger: true,
    },
  ];

  return (
    <>
      <PopUpMenu items={items} />
      {openModal?.type === "removeRole" && (
        <ConfirmDialog
          open
          variant="danger"
          title="حذف نقش"
          description={
            <p>
              آیا از حذف نقش <strong>{openModal.role.name}</strong> مطمئن هستید؟
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

export default RolePopUpMenu;
