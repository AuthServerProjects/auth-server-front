import { LuUserCog } from "react-icons/lu";
import { useEffect, useState } from "react";

import SVG from "../../../../components/SVG/SVG";
import Modal from "../../../../components/Modal";
import type { Role } from "../../../roles/roleTypes";
import { roleService } from "../../../roles/roleService";
import Button from "../../../../components/Button/Button";
import { userRoleService } from "../../userRole/userRoleService";

type Props = {
  userClientId: number;
  onClose: () => void;
  onSaved?: () => void;
};

const ManageRolesModal = ({ userClientId, onClose, onSaved }: Props) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [assigned, setAssigned] = useState<number[]>([]); // roleIds
  const [initial, setInitial] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      roleService.findAll({
        pageNumber: 0,
        pageSize: 100,
        sortBy: "id",
        sortDirection: "ASC",
        filters: {},
      }),
      userRoleService.findByUserClientId(userClientId),
    ])
      .then(([rolesRes, userRoles]) => {
        setRoles(rolesRes.content);
        const ids = userRoles.map((ur) => ur.roleId);
        setAssigned(ids);
        setInitial(ids);
      })
      .catch((err) => console.error("failed to load roles", err))
      .finally(() => setLoading(false));
  }, [userClientId]);

  const toggle = (roleId: number) =>
    setAssigned((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId],
    );

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const toAssign = assigned.filter((id) => !initial.includes(id));
      const toUnassign = initial.filter((id) => !assigned.includes(id));
      await Promise.all([
        ...toAssign.map((roleId) =>
          userRoleService.assign(userClientId, roleId),
        ),
        ...toUnassign.map((roleId) =>
          userRoleService.unassign(userClientId, roleId),
        ),
      ]);
      onSaved?.();
      onClose();
    } catch (err) {
      console.error("save roles failed", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="مدیریت نقش‌ها"
      maxWidth="max-w-xl"
      icon={<LuUserCog size={24} />}
    >
      <div className="flex flex-col">
        {loading ? (
          <p className="text-sm text-gray-100 py-4 text-center">
            در حال بارگذاری...
          </p>
        ) : (
          <div className="w-full grid grid-cols-2">
            {roles.map((role) => {
              const isSelected = assigned.includes(role.id);
              return (
                <div
                  key={role.id}
                  onClick={() => toggle(role.id)}
                  className={`flex items-center gap-2 p-3 m-1 text-gray-300 border border-gray-50 rounded-lg cursor-pointer ${
                    isSelected ? "bg-green-20" : "hover:bg-gray-30"
                  }`}
                >
                  {isSelected ? (
                    <SVG name="tickIcon" className="text-green-30" />
                  ) : (
                    <SVG
                      name="UserOctagonIcon"
                      size={24}
                      color="text-gray-50"
                    />
                  )}
                  {role.name}
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
            disabled={submitting || loading}
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

export default ManageRolesModal;
