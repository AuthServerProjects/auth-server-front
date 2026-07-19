import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState, useMemo, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import type { Role } from "../roleTypes";
import type {
  Permission,
  PermissionGroup,
} from "../../permissions/permissionTypes";
import Chip from "../../../components/Chip";
import { roleService } from "../roleService";
import Box from "../../../components/Box/Box";
import PermissionsBoxList from "./PermissionsBoxList";
import Button from "../../../components/Button/Button";
import { permissionService } from "../../permissions/permissionService";
import { useSelectedClient } from "../../../context/SelectedClientContext";

const schema = z.object({
  name: z.string().min(3, "نام نقش حداقل ۳ کاراکتر باشد"),
  isEnabled: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

const RoleDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  const { selectedClient } = useSelectedClient();

  const role = (state?.role as Role | undefined) ?? undefined;
  const isEdit = params.type === "edit";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: role?.name ?? "",
      isEnabled: role?.isEnabled ?? true,
    },
  });

  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    [],
  );

  // Load all permissions of the selected client for the picker
  useEffect(() => {
    if (!selectedClient) return;
    permissionService
      .findAll({
        pageNumber: 0,
        pageSize: 100,
        sortBy: "id",
        sortDirection: "ASC",
        filters: {},
      })
      .then((res) => setPermissions(res.content))
      .catch((err) => console.error("failed to load permissions", err));
  }, [selectedClient]);

  // On edit, prefill selected permissions from the role (fetch full role by id)
  useEffect(() => {
    if (isEdit && role?.id) {
      roleService
        .findById(role.id)
        .then((full) => setSelectedPermissions(full.permissions ?? []))
        .catch((err) => console.error("failed to load role", err));
    }
  }, [isEdit, role?.id]);

  // Wrap the flat permission list into a single group for PermissionsBoxList
  const groups: PermissionGroup[] = useMemo(
    () =>
      permissions.length > 0
        ? [{ name: selectedClient?.clientName ?? "مجوزها", permissions }]
        : [],
    [permissions, selectedClient],
  );

  const allSelected =
    permissions.length > 0 && selectedPermissions.length === permissions.length;

  const toggleAll = () => {
    setSelectedPermissions(allSelected ? [] : permissions);
  };

  const clearAll = () => setSelectedPermissions([]);

  const removePermission = (id: number) => {
    setSelectedPermissions((prev) => prev.filter((p) => p.id !== id));
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        name: data.name,
        isEnabled: data.isEnabled,
        clientId: selectedClient?.clientId ?? null,
        permissions: selectedPermissions,
      };

      if (isEdit && role?.id) {
        await roleService.update(role.id, payload);
      } else {
        await roleService.save(payload);
      }
      navigate("/roles");
    } catch (err) {
      console.error("save role failed", err);
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
              {...register("name")}
              placeholder="فرمت: resource:action"
              className="w-full text-gray-600 border border-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-70"
            />
            {errors.name && (
              <p className="text-red-500 text-xs pt-2">{errors.name.message}</p>
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
              groups={groups}
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
