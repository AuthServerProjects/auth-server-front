import { FiServer } from "react-icons/fi";
import { useEffect, useState } from "react";

import SVG from "../../../../components/SVG/SVG";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button/Button";
import { clientService } from "../../../clients/clientService";
import type { ClientDropdown } from "../../../clients/clientTypes";
import { userClientService } from "../../userClient/userClientService";

type Props = {
  userId: number; // global user id
  onClose: () => void;
  onSaved?: () => void;
};

const AssignClientModal = ({ userId, onClose, onSaved }: Props) => {
  const [clients, setClients] = useState<ClientDropdown[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    clientService
      .getMyClients()
      .then(setClients)
      .catch((err) => console.error("failed to load clients", err))
      .finally(() => setLoading(false));
  }, []);

  const toggle = (clientDbId: number) =>
    setSelected((prev) =>
      prev.includes(clientDbId)
        ? prev.filter((id) => id !== clientDbId)
        : [...prev, clientDbId],
    );

  // super-admin assigns the user to all selected clients in one call
  const handleSubmit = async () => {
    if (selected.length === 0) return;
    setSubmitting(true);
    try {
      await userClientService.assignToClients({ userId, clientIds: selected });
      onSaved?.();
      onClose();
    } catch (err) {
      console.error("assign failed", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="تخصیص کاربر به کلاینت"
      maxWidth="max-w-xl"
      icon={<FiServer size={24} />}
    >
      <div className="flex flex-col">
        {loading ? (
          <p className="text-sm text-gray-100 py-4 text-center">
            در حال بارگذاری...
          </p>
        ) : (
          <div className="w-full grid grid-cols-2">
            {clients.map((client) => {
              const isSelected = selected.includes(client.clientId);
              return (
                <div
                  key={client.clientId}
                  onClick={() => toggle(client.clientId)}
                  className={`flex items-center gap-2 p-3 m-1 text-gray-300 border border-gray-50 rounded-lg cursor-pointer ${
                    isSelected ? "bg-green-20" : "hover:bg-gray-30"
                  }`}
                >
                  {isSelected ? (
                    <SVG name="tickIcon" className="text-green-30" />
                  ) : (
                    <SVG name="userIcon" />
                  )}
                  {client.clientName}
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            variant="success"
            onClick={handleSubmit}
            disabled={submitting || selected.length === 0}
            className="w-full justify-center"
          >
            {submitting ? "در حال ذخیره..." : "ذخیره"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            انصراف
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignClientModal;
