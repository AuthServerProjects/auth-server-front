import type { Client } from "../clientTypes";
import { LuPencil, LuKey } from "react-icons/lu";
import { useClientActions } from "../hooks/useClientActions";
import PopUpMenu from "../../../components/popUpMenu/PopUpMenu";
import type { PopUpMenuItem } from "../../../components/popUpMenu/types";

type Props = {
  client: Client;
};

const ClientPopUpMenu = ({ client }: Props) => {
  const { handleEdit, handleResetSecret } = useClientActions();

  const items: PopUpMenuItem[] = [
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
      danger: true,
    },
  ];

  return <PopUpMenu items={items} />;
};

export default ClientPopUpMenu;
