import type { ReactNode } from "react";
import { BiMessageSquareAdd } from "react-icons/bi";

import Button from "./Button";

type Props = {
  title: string;
  icon?: ReactNode;
  buttonLabel: string;
  buttonIcon?: ReactNode;
  modalHandling?: () => void;
};

const PagesHeader = ({
  title,
  icon,
  buttonLabel,
  buttonIcon = <BiMessageSquareAdd />,
  modalHandling,
}: Props) => (
  <div className="flex justify-between">
    <div className="flex items-center text-black-100 gap-3 font-bold">
      {icon}
      <h2>{title}</h2>
    </div>
    <Button variant="secondary" icon={buttonIcon} onClick={modalHandling}>
      {buttonLabel}
    </Button>
  </div>
);

export default PagesHeader;
