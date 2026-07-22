import { useState } from "react";
import { TbUsersPlus } from "react-icons/tb";

import Chip from "../../../../components/Chip";
import SVG from "../../../../components/SVG/SVG";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button/Button";
import UserSearch, { type UserOption } from "../UserSearch";
import { userClientService } from "../../userClient/userClientService";

type Props = {
  onClose: () => void;
  onAddNew: () => void;
  onSaved?: () => void;
  title: string;
};

const AddUserModal = ({ onClose, onAddNew, onSaved, title }: Props) => {
  const [selectedUsers, setSelectedUsers] = useState<UserOption[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // attach existing global users to the current client (userClient.save({ userId }))
  const handleSubmit = async () => {
    if (selectedUsers.length === 0) return;
    setSubmitting(true);
    try {
      for (const u of selectedUsers) {
        await userClientService.save({ userId: u.id });
      }
      onSaved?.();
      onClose();
    } catch (err) {
      console.error("attach user(s) failed", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open onClose={onClose} title={title} icon={<TbUsersPlus size={24} />}>
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
                <Chip
                  key={user.id}
                  label={user.phoneNumber}
                  variant="success"
                  onRemove={() =>
                    setSelectedUsers((prev) =>
                      prev.filter((u) => u.id !== user.id),
                    )
                  }
                />
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <hr className="border-gray-50" />
          <Button
            variant="transparent"
            onClick={onAddNew}
            className="w-full justify-center border border-gray-"
          >
            <SVG name="AddIcon" />
            ایجاد کاربر جدید
          </Button>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="success"
              onClick={handleSubmit}
              disabled={submitting || selectedUsers.length === 0}
              className="w-full justify-center"
            >
              {submitting ? "در حال ذخیره..." : "ذخیره"}
            </Button>
            <Button variant="ghost" onClick={() => onClose()}>
              انصراف
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddUserModal;
