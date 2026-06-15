import { z } from "zod";
import { useForm } from "react-hook-form";
import { LuUserCog } from "react-icons/lu";
import { zodResolver } from "@hookform/resolvers/zod";

import PermissionsAccordion, {
  type PermissionGroup,
} from "./PermissionsAccordion";
import type { Role } from "../roleTypes";
import Modal from "../../../components/Modal";
import { useState } from "react";

const mockGroups: PermissionGroup[] = [
  {
    name: "Audit",
    permissions: [{ key: "audit:read", description: "View audit logs" }],
  },
  {
    name: "Client1",
    permissions: [
      { key: "client:create", description: "Create clients" },
      { key: "client:delete", description: "Delete/disable clients" },
      { key: "client:read", description: "View clients" },
      {
        key: "client:regenerate_secret",
        description: "Regenerate client secret",
      },
      { key: "client:update", description: "Update clients" },
    ],
  },
];

const schema = z.object({
  roleName: z.string().min(3, "نام نقش حداقل ۳ کاراکتر باشد"),
  status: z.boolean(),
  permissions: z.array(z.string()),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  isEdit: boolean;
  onClose: () => void;
  role?: Role;
  title: string;
};

const RoleModal = ({ isEdit, onClose, role, title }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      roleName: role?.roleName ?? "",
      status: role?.status ?? false,
      permissions: role?.permissions ?? [],
    },
  });

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const onSubmit = (data: FormValues) => {
    console.log("save role", {
      roleName: data.roleName,
      permissions: selectedPermissions,
    });
    if (isEdit) {
      console.log("edit", { ...role, ...data });
    } else {
      console.log("create", data);
    }
    onClose();
  };

  return (
    <Modal open onClose={onClose} title={title} icon={<LuUserCog size={24} />}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block flex item-start text-sm mb-2 text-black">
            نام نقش
          </label>
          <input
            {...register("roleName")}
            className="w-full text-gray-600 border border-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-70"
            placeholder="فرمت: resource:action"
          />
          {errors.roleName && (
            <p className="text-red-500 text-xs pt-2">
              {errors.roleName.message}
            </p>
          )}
        </div>

        <h3 className="flex mb-3 text-gray-300">مجوزها</h3>
        <div
          className="max-h-100 overflow-y-scroll 
            scrollbar-thin scrollbar-thumb-gray-50 scrollbar-track-transparent hover:scrollbar-thumb-gray-80 scrollbar-thumb-rounded-full"
        >
          <PermissionsAccordion
            groups={mockGroups}
            selected={selectedPermissions}
            onChange={setSelectedPermissions}
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 w-full rounded-lg bg-green-10 text-white disabled:opacity-50 cursor-pointer"
          >
            ذخیره
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-80 text-black-80 cursor-pointer"
          >
            انصراف
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RoleModal;
