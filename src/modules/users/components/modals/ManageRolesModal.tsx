import { LuUserCog } from "react-icons/lu";

import Card from "../CardComponent";
import Modal from "../../../../components/Modal";
import SVG from "../../../../components/SVG/SVG";
import Button from "../../../../components/Button/Button";

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
  onClose: () => void;
}) => {
  return (
    <div>
      <Modal
        open
        onClose={onClose}
        title="مدیریت نقش‌ها"
        maxWidth="max-w-xl"
        icon={<LuUserCog size={24} />}
      >
        <form>
          <div className="w-full grid grid-cols-2">
            {clients.map((client) => (
              <Card
                id={client.id}
                name={client.name}
                icon={
                  <SVG name="UserOctagonIcon" size={24} color="text-gray-50" />
                }
              />
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="submit"
              variant="success"
              onClick={() => console.log("approved")}
              className="w-full justify-center"
            >
              ذخیره
            </Button>
            <Button variant="ghost" onClick={() => onClose()}>
              انصراف
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageRolesModal;
