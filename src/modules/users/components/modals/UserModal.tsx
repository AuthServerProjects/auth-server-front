import { z } from "zod";
import { LuUserPen } from "react-icons/lu";
import { TbUserPlus } from "react-icons/tb";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import type { Control, FieldPath } from "react-hook-form";

import type { User } from "../../userTypes";
import Modal from "../../../../components/Modal";
import Switch from "../../../../components/Switch";

const schema = z.object({
  userName: z.string().min(3, "نام کاربری حداقل ۳ کاراکتر باشد"),
  phoneNumber: z.string().regex(/^\d{10,15}$/, "شماره تلفن معتبر نیست"),
  status: z.boolean(),
  notLocked: z.boolean(),
  notExpired: z.boolean(),
  credentialsNotExpired: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  isEdit: boolean;
  onClose: () => void;
  onCancel?: () => void;
  user?: User;
  title: string;
};

const UserModal = ({ isEdit, onClose, onCancel, user, title }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      userName: user?.userName ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      status: user?.status ?? true,
      notLocked: user?.notLocked ?? true,
      notExpired: user?.notExpired ?? true,
      credentialsNotExpired: user?.credentialsNotExpired ?? true,
    },
  });

  const onSubmit = (data: FormValues) => {
    if (isEdit) {
      console.log("edit", { ...user, ...data });
    } else {
      console.log("create", data);
    }
    onClose();
  };

  return (
    <Modal
      open
      onClose={onClose}
      onCancel={onCancel}
      title={title}
      icon={isEdit ? <LuUserPen size={24} /> : <TbUserPlus size={24} />}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Username */}
        <div>
          <label className="block flex item-start text-sm mb-2 text-black">
            نام کاربری
          </label>
          <input
            {...register("userName")}
            className="w-full text-gray-600 border border-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-70"
            placeholder="نام کاربری را وارد کنید"
          />
          {errors.userName && (
            <p className="text-red-500 text-xs pt-2">
              {errors.userName.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="flex item-start text-sm mb-1 text-black">
            شماره تلفن
          </label>
          <input
            {...register("phoneNumber")}
            className="w-full text-gray-600 border border-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-70"
            placeholder="98XXXXXXXXXX"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <hr className="border-gray-50" />

        {/* Account settings */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-800">
            تنظیمات حساب
          </h3>

          <div className="flex flex-col gap-3 item-start">
            <SwitchRow control={control} name="status" title="فعال" />
            <SwitchRow
              control={control}
              name="notLocked"
              title="حساب قفل نشده"
            />
            <SwitchRow
              control={control}
              name="notExpired"
              title="حساب منقضی نشده"
            />
            <SwitchRow
              control={control}
              name="credentialsNotExpired"
              title="اعتبارنامه منقضی نشده"
            />
          </div>
        </div>

        {/* Actions */}
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
            onClick={onCancel ?? onClose}
            className="px-5 py-2 rounded-lg bg-gray-80 text-black-80 cursor-pointer"
          >
            انصراف
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserModal;

/* --- helper --- */

type SwitchRowProps = {
  control: Control<FormValues>;
  name: FieldPath<FormValues>;
  title: string;
};

const SwitchRow = ({ control, name, title }: SwitchRowProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <div className="flex items-center justify-between">
        <p className="flex text-sm font-medium text-gray-800 pb-4">{title}</p>
        <Switch checked={!!field.value} onCheckedChange={field.onChange} />
      </div>
    )}
  />
);
