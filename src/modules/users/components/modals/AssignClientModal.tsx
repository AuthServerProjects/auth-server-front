import { FiServer } from "react-icons/fi";

import Card from "../CardComponent";
import SVG from "../../../../components/SVG/SVG";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button/Button";

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

export default AssignClientModal;
