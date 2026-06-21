import { useState } from "react";
import { LuPencil } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";

import type { Role } from "../roleTypes";
import ConfirmDialog from "../../../components/ConfirmDialog";
import PopUpMenu from "../../../components/popUpMenu/PopUpMenu";
import type { PopUpMenuItem } from "../../../components/popUpMenu/types";
import { useNavigate } from "react-router-dom";

type ModalAction = {
  type: "removeRole";
  role: Role;
} | null;

type Props = {
  role: Role;
};

const RolePopUpMenu = ({ role }: Props) => {
  const [openModal, setOpenModal] = useState<ModalAction>(null);
  const close = () => setOpenModal(null);

  const handleRemove = () => {
    console.log("remove role!", openModal?.role.id);
    // TODO: API call
    close();
  };

  const navigate = useNavigate();

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
              آیا از حذف مجوز <strong>{openModal.role.roleName}</strong> مطمئن
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

export default RolePopUpMenu;
