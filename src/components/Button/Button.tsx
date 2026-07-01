import type { ButtonHTMLAttributes, ReactNode } from "react";

import { variantSolid, type Variant } from "../../utils/variantStyles";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: Variant;
  size?: ButtonSize;
  icon?: ReactNode;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
  lg: "px-5 py-2.5 text-lg",
};

const Button = ({
  variant = "success",
  size = "md",
  icon,
  children,
  className = "",
  disabled,
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    className={`flex items-center gap-2 rounded-lg whitespace-nowrap cursor-pointer
         transition-colors disabled:opacity-50 disabled:cursor-not-allowed
         ${variantSolid[variant]} ${sizeClasses[size]} ${className}`}
    {...props}
  >
    {icon}
    {children}
  </button>
);

export default Button;
