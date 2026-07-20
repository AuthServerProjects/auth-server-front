import { useState } from "react";
import { LuPencil, LuKey } from "react-icons/lu";

import ClientModal from "./ClientModal";
import type { Client } from "../clientTypes";
import { clientService } from "../clientService";
import ConfirmDialog from "../../../components/ConfirmDialog";
import PopUpMenu from "../../../components/popUpMenu/PopUpMenu";
import type { PopUpMenuItem } from "../../../components/popUpMenu/types";

type ModalAction = {
  type: "editClient" | "secretReset";
  client: Client;
} | null;

type Props = {
  client: Client;
  onChanged?: () => void;
};

const ClientPopUpMenu = ({ client, onChanged }: Props) => {
  const [openModal, setOpenModal] = useState<ModalAction>(null);
  const [loading, setLoading] = useState(false);
  const close = () => setOpenModal(null);

  const handleRegenerate = async () => {
    if (!openModal) return;
    setLoading(true);
    try {
      const message = await clientService.regenerateSecret(
        openModal.client.clientId,
      );
      alert(message);
      close();
      onChanged?.();
    } catch (err) {
      console.error("regenerate secret failed", err);
    } finally {
      setLoading(false);
    }
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
          onSaved={onChanged}
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
          confirmText={loading ? "در حال انجام..." : "تایید"}
          onConfirm={handleRegenerate}
          onClose={close}
        />
      )}
    </>
  );
};

export default ClientPopUpMenu;
