import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Modal from "../../../components/Modal";
import SVG from "../../../components/SVG/SVG";

const schema = z.object({
  phoneNumber: z.string().regex(/^\d{10,15}$/, "شماره تلفن معتبر نیست"),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  onClose: () => void;
  onAddNew: () => void;
  title: string;
};

const AddUserModal = ({ onClose, onAddNew, title }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("search", data);
    onClose();
  };

  return (
    <Modal open onClose={onClose} title={title}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label className="flex item-start mb-3 text-black">
            جستجو کاربران موجود
          </label>
          <input
            {...register("phoneNumber")}
            placeholder="شماره تلفن را وارد کنید"
            className="w-full text-gray-600 border border-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-70"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <hr className="border-gray-50 my-2" />

        <button
          type="button"
          onClick={onAddNew}
          className="flex justify-center gap-2 w-full border border-gray-100 text-gray-100 rounded-lg px-3 py-2 whitespace-nowrap cursor-pointer"
        >
          <SVG name="AddIcon" />
          ایجاد کاربر جدید
        </button>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-10 text-white w-full py-2 rounded-lg whitespace-nowrap cursor-pointer disabled:opacity-50"
          >
            ذخیره
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-50 text-black-80 px-8 py-2 rounded-lg whitespace-nowrap cursor-pointer"
          >
            انصراف
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUserModal;
