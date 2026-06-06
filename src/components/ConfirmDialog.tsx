import { type ReactNode } from "react";

import Modal from "./Modal";
import { LuTriangleAlert } from "react-icons/lu";

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

const variantStyles = {
  danger: {
    icon: "text-red-500",
    button: "bg-red-600",
  },
  warning: {
    icon: "text-yellow-500",
    button: "bg-yellow-600 hover:bg-yellow-700",
  },
  info: {
    icon: "text-blue-500",
    button: "bg-blue-600 hover:bg-blue-700",
  },
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
  const styles = variantStyles[variant];

  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} title="">
      <div className="flex flex-col items-center text-center gap-4 py-2">
        <div className={`p-3 rounded-full bg-gray-50 ${styles.icon}`}>
          <LuTriangleAlert size={32} />
        </div>

        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

        {description && <p className="text-sm text-gray-600">{description}</p>}

        <div className="flex gap-2 w-full mt-2">
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 px-4 py-2 rounded-lg text-white disabled:opacity-50 ${styles.button}`}
          >
            {loading ? "در حال انجام..." : confirmText}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-50 text-black-80 disabled:opacity-50"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
