import type { Session } from "../sessionTypes";
import { TiDeleteOutline } from "react-icons/ti";
import { useSessionActions } from "../hooks/useSessionActions";
import ActionMenu from "../../../components/actionMenu/ActionMenu";
import type { ActionItem } from "../../../components/actionMenu/types";

type Props = {
  session: Session;
};

const SessionActionsMenu = ({ session }: Props) => {
  const { handleCancel, handleCancelAll } = useSessionActions();

  const items: ActionItem[] = [
    {
      key: "cancel",
      label: "لغو نشست",
      icon: <TiDeleteOutline />,
      onClick: () => handleCancel(session),
      danger: true,
    },
    {
      key: "cancelALl",
      label: "لغو همه نشست ها",
      icon: <TiDeleteOutline />,
      onClick: () => handleCancelAll(session),
      danger: true,
    },
  ];

  return <ActionMenu items={items} />;
};

export default SessionActionsMenu;
