import { FcCancel } from "react-icons/fc";

import type { Session } from "../sessionTypes";
import { useSessionActions } from "../hooks/useSessionActions";
import PopUpMenu from "../../../components/popUpMenu/PopUpMenu";
import type { PopUpMenuItem } from "../../../components/popUpMenu/types";

type Props = {
  session: Session;
};

const SessionPopUpMenu = ({ session }: Props) => {
  const { handleCancel, handleCancelAll } = useSessionActions();

  const items: PopUpMenuItem[] = [
    {
      key: "cancel",
      label: "لغو نشست",
      icon: <FcCancel size={24} />,
      onClick: () => handleCancel(session),
      danger: true,
    },
    {
      key: "cancelALl",
      label: "لغو همه نشست ها",
      icon: <FcCancel size={24} />,
      onClick: () => handleCancelAll(session),
      danger: true,
    },
  ];

  return <PopUpMenu items={items} />;
};

export default SessionPopUpMenu;
