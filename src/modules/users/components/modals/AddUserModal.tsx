import { useState } from "react";
import { IoClose } from "react-icons/io5";

import SVG from "../../../../components/SVG/SVG";
import Modal from "../../../../components/Modal";
import UserSearch, { type UserOption } from "../UserSearch";

type Props = {
  onClose: () => void;
  onAddNew: () => void;
  title: string;
};

const AddUserModal = ({ onClose, onAddNew, title }: Props) => {
  const [selectedUsers, setSelectedUsers] = useState<UserOption[]>([]);
  const [submitting, setSubmitting] = useState(false);

  console.log("save", selectedUsers);

  const handleSubmit = async () => {
    if (selectedUsers.length === 0) return;
    setSubmitting(true);
    try {
      console.log("save", selectedUsers);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open onClose={onClose} title={title}>
      <div className="flex flex-col">
        <label className="flex item-start mb-3 text-black">
          جستجو کاربران موجود
        </label>
        <UserSearch selectedUsers={selectedUsers} onChange={setSelectedUsers} />
        <div
          className="gap-2 my-2 overflow-auto h-18
          scrollbar-thin scrollbar-thumb-gray-50 scrollbar-track-transparent hover:scrollbar-thumb-gray-80 scrollbar-thumb-rounded-full"
        >
          {selectedUsers.length !== 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-content bg-green-5 rounded-lg text-sm text-green-10 rounded-lg px-2 py-1"
                >
                  <span>{user.phoneNumber}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedUsers((prev) =>
                        prev.filter((u) => u.id !== user.id),
                      )
                    }
                  >
                    <IoClose size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <hr className="border-gray-50" />
          <button
            type="button"
            onClick={onAddNew}
            className="flex justify-center gap-2 w-full border border-gray-100 text-gray-100 rounded-lg px-3 py-2 whitespace-nowrap cursor-pointer"
          >
            <SVG name="AddIcon" />
            ایجاد کاربر جدید
          </button>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={selectedUsers.length === 0 || submitting}
              className="bg-green-10 text-white w-full py-2 rounded-lg whitespace-nowrap cursor-pointer disabled:opacity-50"
            >
              {submitting ? "در حال ذخیره..." : "ذخیره"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-50 text-black-80 px-8 py-2 rounded-lg whitespace-nowrap cursor-pointer"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddUserModal;
