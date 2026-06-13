import { z } from "zod";
import { LuKey } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "../../../components/Modal";
import type { Permission } from "../permissionTypes";

const schema = z.object({
  permissionName: z.string().min(3, "نام مجوز حداقل ۳ کاراکتر باشد"),
  description: z.string(),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  isEdit: boolean;
  onClose: () => void;
  permission?: Permission;
  title: string;
};

const PermissionModal = ({ isEdit, onClose, permission, title }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      permissionName: permission?.permissionName ?? "",
      description: permission?.description ?? "",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (isEdit) {
      console.log("edit", { ...permission, ...data });
    } else {
      console.log("create", data);
    }
    onClose();
  };

  return (
    <Modal open onClose={onClose} title={title} icon={<LuKey size={24} />}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="block flex item-start text-sm mb-2 text-black">
            نام مجوز
          </label>
          <input
            {...register("permissionName")}
            className="w-full text-gray-600 border border-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-70"
            placeholder="فرمت: resource:action"
          />
          {errors.permissionName && (
            <p className="text-red-500 text-xs pt-2">
              {errors.permissionName.message}
            </p>
          )}
        </div>
        <div>
          <label className="flex item-start text-sm mb-1 text-black">
            توضیحات
          </label>
          <textarea
            rows={7}
            {...register("description")}
            className="w-full text-gray-600 border border-gray-50 rounded-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-gray-70"
            placeholder="توضیح دهید این مجوز چه دسترسی ای ایجاد می کند"
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
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

export default PermissionModal;
