import type { Client } from "../types";
import { LuPencil, LuKey } from "react-icons/lu";
import { useClientActions } from "../hooks/useClientActions";
import ActionMenu from "../../../components/actionMenu/ActionMenu";
import type { ActionItem } from "../../../components/actionMenu/types";

type Props = {
  client: Client;
};

const ClientActionsMenu = ({ client }: Props) => {
  const { handleEdit, handleResetSecret } = useClientActions();

  const items: ActionItem[] = [
    {
      key: "edit",
      label: "ویرایش",
      icon: <LuPencil />,
      onClick: () => handleEdit(client),
    },
    {
      key: "password",
      label: "بازسازی سکرت",
      icon: <LuKey />,
      onClick: () => handleResetSecret(client),
    },
  ];

  return <ActionMenu items={items} />;
};

export default ClientActionsMenu;
