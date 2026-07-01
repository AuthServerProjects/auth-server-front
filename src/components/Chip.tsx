import { IoClose } from "react-icons/io5";
import { variantSoft, type Variant } from "../utils/variantStyles";

type ChipProps = {
  label: string;
  onRemove?: () => void;
  variant?: Variant;
};

const Chip = ({ label, onRemove, variant = "success" }: ChipProps) => (
  <div
    className={`flex items-center gap-1 text-sm rounded-md px-2 py-0.5 ${variantSoft[variant]}`}
  >
    {onRemove && (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        aria-label={`حذف ${label}`}
        className="cursor-pointer p-0.5"
      >
        <IoClose size={14} />
      </button>
    )}
    <span>{label}</span>
  </div>
);

export default Chip;
