import type { SVGProps as ReactSVGProps } from "react";

import AddIcon from "../../assets/icons/add.svg?react";
import squareIcon from "../../assets/icons/square.svg?react";
import tickIcon from "../../assets/icons/tick-square.svg?react";
import userIcon from "../../assets/icons/user-square.svg?react";
import DownloadIcon from "../../assets/icons/download.svg?react";
import UserOctagonIcon from "../../assets/icons/user-octagon.svg?react";

export const icons = {
  DownloadIcon,
  AddIcon,
  userIcon,
  squareIcon,
  tickIcon,
  UserOctagonIcon,
} as const;

type SVGProps = {
  name: keyof typeof icons;
  color?: string;
  size?: number | string;
  className?: string;
} & ReactSVGProps<SVGSVGElement>;

const SVG = ({
  name,
  color = "",
  size = 24,
  className,
  ...props
}: SVGProps) => {
  const Icon = icons[name];

  if (!Icon) {
    console.warn(`SVG: no icon found for name "${name}"`);
    return null;
  }

  return (
    <Icon
      width={size}
      height={size}
      stroke={color}
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
};

export default SVG;