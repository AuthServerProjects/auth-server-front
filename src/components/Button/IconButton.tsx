import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = {
  icon: ReactNode;
  "aria-label": string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = ({
  icon,
  className = "",
  type = "button",
  ...props
}: IconButtonProps) => (
  <button
    type={type}
    className={`p-1 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-30 
        transition-colors cursor-pointer disabled:opacity-50 ${className}`}
    {...props}
  >
    {icon}
  </button>
);

export default IconButton;
