import { RiUserSettingsLine } from "react-icons/ri";

import Card from "../CardComponent";
import Modal from "../../../../components/Modal";

const clients = [
  { id: 1, name: "SuperAdmin" },
  { id: 2, name: "Admin" },
  { id: 3, name: "User" },
  { id: 4, name: "Manager" },
  { id: 5, name: "Owner" },
  { id: 6, name: "Operator" },
];

const ManageRolesModal = ({
  userId,
  onClose,
}: {
  userId: number;
  clientId: number;
  onClose: () => void;
}) => {
  return (
    <div>
      <Modal open onClose={onClose} title="مدیریت نقش‌ها" maxWidth="max-w-xl">
        <form>
          <div className="w-full grid grid-cols-2">
            {clients.map((client) => (
              <Card
                id={client.id}
                name={client.name}
                icon={<RiUserSettingsLine size={24} />}
              />
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="submit"
              onClick={() => console.log("approved")}
              className="bg-green-10 text-white w-full py-2 rounded-lg whitespace-nowrap cursor-pointer"
            >
              تایید
            </button>
            <button
              type="button"
              onClick={() => onClose()}
              className="bg-gray-50 text-black-80 px-8 py-2 rounded-lg whitespace-nowrap cursor-pointer"
            >
              انصراف
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageRolesModal;
