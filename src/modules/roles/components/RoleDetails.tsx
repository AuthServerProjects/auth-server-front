import { z } from "zod";
import { useState, useMemo } from "react";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import type {
  Permission,
  PermissionGroup,
} from "../../permissions/permissionTypes";
import Chip from "../../../components/Chip";
import Box from "../../../components/Box/Box";
import PermissionsBoxList from "./PermissionsBoxList";
import Button from "../../../components/Button/Button";

const mockGroups: PermissionGroup[] = [
  {
    name: "Audit",
    permissions: [
      { id: 1, name: "audit:read", description: "View audit logs" },
    ],
  },
  {
    name: "Client1",
    permissions: [
      { id: 2, name: "client:create", description: "Create clients" },
      { id: 3, name: "client:delete", description: "Delete/disable clients" },
      { id: 4, name: "client:read", description: "View clients" },
      {
        id: 5,
        name: "client:regenerate_secret",
        description: "Regenerate client secret",
      },
      { id: 6, name: "client:update", description: "Update clients" },
    ],
  },
  {
    name: "Client2",
    permissions: [
      { id: 7, name: "client:create", description: "Create clients" },
      { id: 8, name: "client:delete", description: "Delete/disable clients" },
      { id: 9, name: "client:read", description: "View clients" },
      {
        id: 10,
        name: "client:regenerate_secret",
        description: "Regenerate client secret",
      },
      { id: 11, name: "client:update", description: "Update clients" },
    ],
  },
  {
    name: "Client3",
    permissions: [
      { id: 12, name: "client:create", description: "Create clients" },
      { id: 13, name: "client:delete", description: "Delete/disable clients" },
      { id: 14, name: "client:read", description: "View clients" },
      {
        id: 15,
        name: "client:regenerate_secret",
        description: "Regenerate client secret",
      },
      { id: 16, name: "client:update", description: "Update clients" },
    ],
  },
  {
    name: "Client4",
    permissions: [
      { id: 17, name: "client:create", description: "Create clients" },
      { id: 18, name: "client:delete", description: "Delete/disable clients" },
      { id: 19, name: "client:read", description: "View clients" },
      {
        id: 20,
        name: "client:regenerate_secret",
        description: "Regenerate client secret",
      },
      { id: 21, name: "client:update", description: "Update clients" },
    ],
  },
  {
    name: "Client5",
    permissions: [
      { id: 22, name: "client:create", description: "Create clients" },
      { id: 23, name: "client:delete", description: "Delete/disable clients" },
      { id: 24, name: "client:read", description: "View clients" },
      {
        id: 25,
        name: "client:regenerate_secret",
        description: "Regenerate client secret",
      },
      { id: 26, name: "client:update", description: "Update clients" },
    ],
  },
  {
    name: "Client6",
    permissions: [
      { id: 27, name: "client:create", description: "Create clients" },
      { id: 28, name: "client:delete", description: "Delete/disable clients" },
      { id: 29, name: "client:read", description: "View clients" },
      {
        id: 30,
        name: "client:regenerate_secret",
        description: "Regenerate client secret",
      },
      { id: 31, name: "client:update", description: "Update clients" },
    ],
  },
];

const schema = z.object({
  roleName: z.string().min(3, "نام نقش حداقل ۳ کاراکتر باشد"),
  status: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

const RoleDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  const isEdit = params.type === "edit";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      roleName: state?.role?.roleName ?? "",
      status: state?.role?.status ?? false,
    },
  });

  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    [],
  );

  const allPermissions = useMemo(
    () => mockGroups.flatMap((g) => g.permissions),
    [],
  );

  const allSelected =
    allPermissions.length > 0 &&
    selectedPermissions.length === allPermissions.length;

  const toggleAll = () => {
    setSelectedPermissions(allSelected ? [] : allPermissions);
  };

  const clearAll = () => setSelectedPermissions([]);

  const removePermission = (id: number) => {
    setSelectedPermissions((prev) => prev.filter((p) => p.id !== id));
  };

  const onSubmit = (data: FormValues) => {
    const payload = { ...data, permissions: selectedPermissions };
    if (isEdit) {
      console.log("edit", { ...state.role, ...payload });
    } else {
      console.log("create", payload);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-white w-full h-full m-4 p-4 rounded-lg max-h-200 border border-gray-50 gap-4"
    >
      <div className="flex gap-8">
        <div className="w-120 flex flex-col gap-4">
          <div>
            <h3 className="flex text-black-100 mb-3">نام نقش</h3>
            <input
              {...register("roleName")}
              placeholder="فرمت: resource:action"
              className="w-full text-gray-600 border border-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-70"
            />
            {errors.roleName && (
              <p className="text-red-500 text-xs pt-2">
                {errors.roleName.message}
              </p>
            )}
          </div>

          <Box
            header={
              <div className="flex items-center justify-between">
                <span className="text-black-100">موارد انتخاب شده</span>
                <span className="text-sm text-gray-70">
                  {selectedPermissions.length}
                </span>
              </div>
            }
            bodyClassName="p-3 h-135 overflow-y-auto
              scrollbar-thin scrollbar-thumb-gray-50 scrollbar-track-transparent
              hover:scrollbar-thumb-gray-80 scrollbar-thumb-rounded-full"
          >
            {selectedPermissions.length === 0 ? (
              <p className="text-xs text-gray-70">موردی انتخاب نشده است</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedPermissions.map((permission) => (
                  <Chip
                    key={permission.id}
                    label={permission.name}
                    onRemove={() => removePermission(permission.id)}
                    variant="success"
                  />
                ))}
              </div>
            )}
          </Box>

          <div className="flex gap-2 w-full">
            <Button
              type="submit"
              variant="success"
              disabled={isSubmitting}
              className="w-full justify-center"
            >
              ذخیره
            </Button>
            <Button variant="ghost" onClick={() => navigate("/roles")}>
              انصراف
            </Button>
            <Button variant="softWarning" onClick={clearAll}>
              پاک کردن همه
            </Button>
          </div>
        </div>

        <div className="w-full">
          <div className="flex justify-between mb-3 text-black-100">
            <h3>مجوزها</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <p className="text-sm">انتخاب همه</p>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="rounded-sm text-green-10 focus:ring-gray-30 ml-4 cursor-pointer"
              />
            </label>
          </div>

          <div
            className="h-170 overflow-y-auto
              scrollbar-thin scrollbar-thumb-gray-50 scrollbar-track-transparent
              hover:scrollbar-thumb-gray-80 scrollbar-thumb-rounded-full"
          >
            <PermissionsBoxList
              groups={mockGroups}
              selected={selectedPermissions}
              onChange={setSelectedPermissions}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default RoleDetails;
