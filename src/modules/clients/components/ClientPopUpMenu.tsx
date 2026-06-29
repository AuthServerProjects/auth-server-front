import { useState } from "react";
import { LuPencil, LuKey } from "react-icons/lu";

import ClientModal from "./ClientModal";
import type { Client } from "../clientTypes";
import ConfirmDialog from "../../../components/ConfirmDialog";
import PopUpMenu from "../../../components/popUpMenu/PopUpMenu";
import type { PopUpMenuItem } from "../../../components/popUpMenu/types";

type ModalAction = {
  type: "editClient" | "secretReset";
  client: Client;
} | null;

type Props = {
  client: Client;
};

const ClientPopUpMenu = ({ client }: Props) => {
  const [openModal, setOpenModal] = useState<ModalAction>(null);
  const close = () => setOpenModal(null);

  const handleRemove = () => {
    console.log("remove role!", openModal?.client.id);
    // TODO: API call
    close();
  };

  const items: PopUpMenuItem[] = [
    {
      key: "edit",
      label: "ویرایش",
      icon: <LuPencil />,
      onClick: () => setOpenModal({ type: "editClient", client }),
    },
    {
      key: "secretReset",
      label: "بازسازی سکرت",
      icon: <LuKey />,
      onClick: () => setOpenModal({ type: "secretReset", client }),
      danger: true,
    },
  ];

  return (
    <>
      <PopUpMenu items={items} />
      {openModal?.type === "editClient" && (
        <ClientModal
          isEdit
          onClose={close}
          client={openModal.client}
          title="ویرایش کلاینت"
        />
      )}
      {openModal?.type === "secretReset" && (
        <ConfirmDialog
          open
          variant="danger"
          title="بازسازی سکرت"
          description={
            <p>
              آیا از بازسازی سکرت کلاینت{" "}
              <strong>{openModal.client.clientId}</strong> مطمئن هستید؟
            </p>
          }
          confirmText="تایید"
          onConfirm={handleRemove}
          onClose={close}
        />
      )}
    </>
  );
};

export default ClientPopUpMenu;
