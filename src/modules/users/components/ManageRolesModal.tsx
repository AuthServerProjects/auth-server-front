import { Form } from "react-router-dom";
import Modal from "../../../components/Modal";

const ManageRolesModal = ({
  userId,
  onClose,
}: {
  userId: Number;
  onClose: () => void;
}) => {
  return (
    <div>
      <Modal open onClose={onClose} title="مدیریت نقش‌ها">
        <Form>
          <div></div>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageRolesModal;
