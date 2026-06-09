import { IoClose } from "react-icons/io5";
import { type ReactNode, useEffect } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onCancel?: () => void;
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  maxWidth?: string;
};

const Modal = ({
  open,
  onClose,
  onCancel,
  title,
  icon,
  children,
  maxWidth = "max-w-md",
}: ModalProps) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow-lg w-full  p-6 mx-4 ${maxWidth}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between pb-2 mb-6 border-b border-gray-50">
            <div className="flex items-center gap-2 text-gray-300 text-xl">
              {icon}
              {title}
            </div>
            <button
              onClick={onCancel ?? onClose}
              className="text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              <IoClose size={24} />
            </button>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
