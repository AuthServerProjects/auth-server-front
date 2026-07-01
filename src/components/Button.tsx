import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-green-10 text-white",
  secondary: "bg-gray-100 text-white",
  danger: "bg-red-500 text-white",
  ghost: "bg-gray-30 text-gray-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
  lg: "px-5 py-2.5 text-lg",
};

const Button = ({
  variant = "primary",
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
         ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    {...props}
  >
    {icon}
    {children}
  </button>
);

export default Button;
