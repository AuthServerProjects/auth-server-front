import { variantSoft, type Variant } from "../../utils/variantStyles";

type BadgeProps = {
  variant?: Variant;
  label: string;
  className?: string;
};

const Badge = ({ variant = "neutral", label, className = "" }: BadgeProps) => (
  <span
    className={`inline-flex px-2 py-1 rounded-full text-xs ${variantSoft[variant]} ${className}`}
  >
    {label}
  </span>
);

export default Badge;
