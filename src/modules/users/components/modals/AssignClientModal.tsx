import { FiServer } from "react-icons/fi";

import Card from "../CardComponent";
import SVG from "../../../../components/SVG/SVG";
import Modal from "../../../../components/Modal";

const clients = [
  { id: 1, name: "AdminPanel" },
  { id: 2, name: "SidePay" },
  { id: 3, name: "Wallet" },
  { id: 4, name: "MyBpm" },
  { id: 5, name: "RialDigital" },
  { id: 6, name: "PolPay" },
];

const AssignClientModal = ({
  userId,
  onClose,
}: {
  userId: number;
  clientId: number;
  onClose: () => void;
}) => {
  return (
    <div>
      <Modal
        open
        onClose={onClose}
        title="تخصیص کاربر به کلاینت"
        maxWidth="max-w-xl"
        icon={<FiServer size={24} />}
      >
        <form>
          <div className="w-full grid grid-cols-2">
            {clients.map((client) => (
              <Card
                id={client.id}
                name={client.name}
                icon={<SVG name="userIcon" />}
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

export default AssignClientModal;
