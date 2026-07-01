import { z } from "zod";
import { FiServer } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import type { Control, FieldPath } from "react-hook-form";

import {
  CLIENT_AUTHENTICATION_METHODS,
  AUTHORIZATION_GRANT_TYPES,
  SCOPES,
} from "../clientTypes";
import type { Client } from "../clientTypes";
import Modal from "../../../components/Modal";
import Switch from "../../../components/Switch";
import MultiSelect from "../../../components/MultiSelect";
import Button from "../../../components/Button/Button";

const schema = z.object({
  clientId: z.string().min(1, "شناسه کلاینت الزامی است"),
  authorizationGrantTypes: z
    .array(z.string())
    .min(1, "حداقل یک مورد انتخاب کنید"),
  clientAuthenticationMethods: z
    .array(z.string())
    .min(1, "حداقل یک مورد انتخاب کنید"),
  scopes: z.array(z.string()).min(1, "حداقل یک مورد انتخاب کنید"),
  redirectUris: z.array(z.string()).min(1, "حداقل یک مورد انتخاب کنید"),
  refreshTokenTimeToLive: z.number().min(0),
  accessTokenTimeToLive: z.number().min(0),
  authorizationCodeTimeToLive: z.number().min(0),
  requireProofKey: z.boolean(),
  reuseRefreshTokens: z.boolean(),
  requireAuthorizationConsent: z.boolean(),
  isEnabled: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  isEdit: boolean;
  onClose: () => void;
  client?: Client;
  title: string;
};

const ClientModal = ({ isEdit, onClose, client, title }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      clientId: client?.clientId ?? "",
      authorizationGrantTypes: client?.authorizationGrantTypes ?? [],
      clientAuthenticationMethods: client?.clientAuthenticationMethods ?? [],
      scopes: client?.scopes ?? [],
      redirectUris: client?.redirectUris ?? [],
      accessTokenTimeToLive: client?.setting?.accessTokenTimeToLive ?? 10,
      refreshTokenTimeToLive: client?.setting?.refreshTokenTimeToLive ?? 30,
      authorizationCodeTimeToLive:
        client?.setting?.authorizationCodeTimeToLive ?? 0,
      requireProofKey: client?.setting?.requireProofKey ?? true,
      reuseRefreshTokens: client?.setting?.reuseRefreshTokens ?? true,
      requireAuthorizationConsent:
        client?.setting?.requireAuthorizationConsent ?? false,
      isEnabled: client?.isEnabled ?? true,
    },
  });

  const onSubmit = (data: FormValues) => {
    if (isEdit) {
      console.log("edit", { ...client, ...data });
    } else {
      console.log("create", data);
    }
    onClose();
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={title}
      maxWidth="max-w-xl"
      icon={<FiServer size={24} />}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col gap-6">
          <div>
            <label className="block flex item-start text-sm mb-2 text-black">
              شناسه کلاینت
            </label>
            <input
              {...register("clientId")}
              className="w-full text-gray-600 border border-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-70"
              placeholder="my-app-client"
            />
            {errors.clientId && (
              <p className="text-red-500 text-xs pt-2">
                {errors.clientId.message}
              </p>
            )}
          </div>
          <div>
            <label className="block flex item-start text-sm mb-2 text-black">
              انواع مجوز
            </label>
            <Controller
              control={control}
              name="authorizationGrantTypes"
              render={({ field }) => (
                <MultiSelect
                  options={AUTHORIZATION_GRANT_TYPES}
                  value={field.value}
                  onChange={field.onChange}
                  variant="success"
                />
              )}
            />
            {errors.authorizationGrantTypes && (
              <p className="text-red-500 text-xs pt-2">
                {errors.authorizationGrantTypes.message}
              </p>
            )}
          </div>
          <div>
            <label className="block flex item-start text-sm mb-2 text-black">
              محدوده‌ها
            </label>
            <Controller
              control={control}
              name="scopes"
              render={({ field }) => (
                <MultiSelect
                  options={SCOPES}
                  value={field.value}
                  onChange={field.onChange}
                  variant="danger"
                />
              )}
            />
            {errors.scopes && (
              <p className="text-red-500 text-xs pt-2">
                {errors.scopes.message}
              </p>
            )}
          </div>
          <div>
            <label className="block flex item-start text-sm mb-2 text-black">
              روش‌های احراز هویت
            </label>
            <Controller
              control={control}
              name="clientAuthenticationMethods"
              render={({ field }) => (
                <MultiSelect
                  options={CLIENT_AUTHENTICATION_METHODS}
                  value={field.value}
                  onChange={field.onChange}
                  variant="info"
                />
              )}
            />
            {errors.clientAuthenticationMethods && (
              <p className="text-red-500 text-xs pt-2">
                {errors.clientAuthenticationMethods.message}
              </p>
            )}
          </div>
          <div>
            <label className="block flex item-start text-sm mb-2 text-black">
              آدرس‌های بازگشت
            </label>
            <input
              {...register("redirectUris")}
              className="w-full text-gray-600 border border-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-70"
              placeholder="https://example.com/callback"
            />
          </div>

          <hr className="border-gray-50" />
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block flex item-start text-sm mb-2 text-black">
                مدت اعتبار Refresh Token
              </label>
              <NumberInput
                {...register("refreshTokenTimeToLive", { valueAsNumber: true })}
                suffix="دقیقه"
              />
            </div>

            <div>
              <label className="block flex item-start text-sm mb-2 text-black">
                مدت اعتبار Access Token
              </label>
              <NumberInput
                {...register("accessTokenTimeToLive", { valueAsNumber: true })}
                suffix="دقیقه"
              />
            </div>

            <div>
              <label className="block flex item-start text-sm mb-2 text-black">
                مدت اعتبار کد مجوز
              </label>
              <NumberInput
                {...register("authorizationCodeTimeToLive", {
                  valueAsNumber: true,
                })}
                suffix="دقیقه"
              />
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-6">
              <SwitchRow
                control={control}
                name="requireProofKey"
                title="نیاز به PKCE"
              />
              <SwitchRow
                control={control}
                name="reuseRefreshTokens"
                title="استفاده مجدد Refresh Token"
              />
              <SwitchRow
                control={control}
                name="requireAuthorizationConsent"
                title="نیاز به رضایت"
              />
              <SwitchRow control={control} name="isEnabled" title="فعال" />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button
              type="submit"
              variant="success"
              disabled={isSubmitting}
              className="w-full justify-center"
            >
              ذخیره
            </Button>
            <Button variant="ghost" onClick={onClose}>
              انصراف
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ClientModal;

/* --- helpers --- */

type NumberInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  suffix?: string;
};

const NumberInput = ({ suffix, ...props }: NumberInputProps) => (
  <div className="flex items-center w-full border border-gray-50 rounded-lg px-3 py-2 focus-within:ring-1 focus-within:ring-gray-70">
    <input
      type="number"
      {...props}
      className="flex-1 min-w-0 h-6 bg-transparent text-gray-600 focus:outline-none focus:ring-1 focus:ring-white border border-white  "
    />
    {suffix && (
      <span className="text-xs text-gray-70 shrink-0 mr-2">{suffix}</span>
    )}
  </div>
);

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
      <div className="flex items-center gap-2 ">
        <Switch checked={!!field.value} onCheckedChange={field.onChange} />
        <div className="flex flex-col items-start">
          <p className="text-sm text-gray-800">{title}</p>
        </div>
      </div>
    )}
  />
);
