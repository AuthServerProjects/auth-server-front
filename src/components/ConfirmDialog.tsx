import { type ReactNode } from "react";
import { TbInfoHexagon } from "react-icons/tb";

import Modal from "./Modal";
import Button from "./Button/Button";

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

const variantStyles: Record<"danger" | "warning" | "info", string> = {
  danger: "text-red-500",
  warning: "text-orange-500",
  info: "text-blue-500",
};

const ConfirmDialog = ({
  open,
  title = "آیا مطمئن هستید؟",
  description,
  confirmText = "تأیید",
  cancelText = "انصراف",
  variant = "warning",
  loading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) => {
  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} title="">
      <div className="flex flex-col items-center text-center gap-5 py-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className={variantStyles[variant]}>
          <TbInfoHexagon size={80} />
        </div>

        {description && <p className="text-sm text-gray-600">{description}</p>}

        <div className="flex gap-2 w-full mt-2">
          <Button
            variant={variant}
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 justify-center"
          >
            {loading ? "در حال انجام..." : confirmText}
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={loading}
            className="flex-1 justify-center"
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
