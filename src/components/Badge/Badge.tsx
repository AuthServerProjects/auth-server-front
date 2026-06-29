type BadgeVariant = "success" | "danger" | "warning" | "neutral" | "info";

type BadgeProps = {
  variant?: BadgeVariant;
  label: string;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  success: "bg-green-100 text-green-700",
  danger: "bg-red-100 text-red-700",
  warning: "bg-yellow-100 text-yellow-700",
  neutral: "bg-gray-50 text-gray-700",
  info: "bg-blue-100 text-blue-700",
};

const Badge = ({ variant = "neutral", label, className = "" }: BadgeProps) => {
  return (
    <span
      className={`inline-flex px-2 py-1 rounded-full text-xs ${variantClasses[variant]} ${className}`}
    >
      {label}
    </span>
  );
};

export default Badge;
