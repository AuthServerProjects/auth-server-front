import { z } from "zod";
import { LuUserPen } from "react-icons/lu";
import { TbUserPlus } from "react-icons/tb";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import type { Control, FieldPath } from "react-hook-form";

import type { UserRow } from "../../userRow";
import Modal from "../../../../components/Modal";
import Switch from "../../../../components/Switch";
import Button from "../../../../components/Button/Button";
import { userService } from "../../generalUser/userService";
import { userClientService } from "../../userClient/userClientService";

const schema = z.object({
  username: z.string().min(3, "نام کاربری حداقل ۳ کاراکتر باشد"),
  phoneNumber: z.string().regex(/^\d{10,15}$/, "شماره تلفن معتبر نیست"),
  isEnabled: z.boolean(),
  isAccountNonLocked: z.boolean(),
  isAccountNonExpired: z.boolean(),
  isCredentialsNonExpired: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  isEdit: boolean;
  onClose: () => void;
  onCancel?: () => void;
  onSaved?: () => void;
  user?: UserRow;
  title: string;
  isFromClient?: boolean;
};

const UserModal = ({
  isEdit,
  onClose,
  onCancel,
  onSaved,
  user,
  title,
  isFromClient,
}: Props) => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: user?.username ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      isEnabled: user?.isEnabled ?? true,
      isAccountNonLocked: true,
      isAccountNonExpired: true,
      isCredentialsNonExpired: true,
    },
  });
  const onSubmit = async (data: FormValues) => {
    try {
      if (isEdit && user) {
        if (isFromClient) {
          // per-client edit → update membership (account flags live here)
          const full = await userClientService.findById(user.id);
          await userClientService.update(user.id, {
            ...full,
            isEnabled: data.isEnabled,
            isAccountNonLocked: data.isAccountNonLocked,
            isAccountNonExpired: data.isAccountNonExpired,
            isCredentialsNonExpired: data.isCredentialsNonExpired,
            user: {
              ...full.user,
              username: data.username,
              phoneNumber: data.phoneNumber,
            },
          });
        } else {
          // general edit → update global user
          await userService.update(user.id, {
            id: user.id,
            username: data.username,
            phoneNumber: data.phoneNumber,
            isEnabled: data.isEnabled,
          });
        }
      } else {
        // CREATE
        if (isFromClient) {
          // atomic: backend creates global user + attaches to client-from-context
          await userClientService.save({
            newUser: {
              username: data.username,
              phoneNumber: data.phoneNumber,
              isEnabled: data.isEnabled,
            },
          });
        } else {
          // general: create global user only
          await userService.save({
            username: data.username,
            phoneNumber: data.phoneNumber,
            isEnabled: data.isEnabled,
          });
        }
      }
      onSaved?.();
      onClose();
    } catch (err) {
      console.error("save user failed", err);
      setError("username", { message: "ذخیره با خطا مواجه شد" });
    }
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
            {...register("username")}
            className="w-full text-gray-600 border border-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-70"
            placeholder="نام کاربری را وارد کنید"
          />
          {errors.username && (
            <p className="text-red-500 text-xs pt-2">
              {errors.username.message}
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
            className="w-full text-gray-600 border border-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-70"
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
            <SwitchRow control={control} name="isEnabled" title="فعال" />
            {isFromClient && isEdit && (
              <>
                <SwitchRow
                  control={control}
                  name="isAccountNonLocked"
                  title="حساب قفل نشده"
                />
                <SwitchRow
                  control={control}
                  name="isAccountNonExpired"
                  title="حساب منقضی نشده"
                />
                <SwitchRow
                  control={control}
                  name="isCredentialsNonExpired"
                  title="اعتبارنامه منقضی نشده"
                />
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Button
            type="submit"
            variant="success"
            disabled={isSubmitting}
            className="w-full justify-center"
          >
            {isSubmitting ? "در حال ذخیره..." : "ذخیره"}
          </Button>
          <Button variant="ghost" onClick={onCancel ?? onClose}>
            انصراف
          </Button>
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
