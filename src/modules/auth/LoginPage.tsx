import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HiOutlineLockClosed } from "react-icons/hi";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuPhone, LuArrowLeft } from "react-icons/lu";

import bpmLogo from "../../assets/BPM.svg";
import Button from "../../components/Button/Button";

const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "شماره تلفن الزامی است")
    .regex(/^09\d{9}$/, "شماره تلفن معتبر نیست (مثال: 09XXXXXXXXX)"),
});

type PhoneForm = z.infer<typeof phoneSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PhoneForm>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phoneNumber: "" },
  });

  const onSubmit = async (data: PhoneForm) => {
    console.log("send code to", data.phoneNumber);
    setPhoneNumber(data.phoneNumber);
    navigate("/login/verify", { state: { phoneNumber: data.phoneNumber } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex justify-start p-4">
        <button
          type="button"
          onClick={() => console.log("toggle theme")}
          aria-label="تغییر تم"
          className="text-gray-100 hover:text-gray-300 cursor-pointer transition-colors"
        >
          <FaRegMoon size={20} />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-14 h-14 bg-green-10 rounded-xl text-white flex items-center justify-center mb-4">
          <HiOutlineLockClosed size={30} />
        </div>

        <div className="text-black-100 font-bold text-2xl mb-8">
          پنل مدیریت احراز هویت شرکت به پرداخت ملت
        </div>

        <div className="w-full max-w-md bg-white border border-gray-50 rounded-xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-gray-300 font-bold text-base mb-2">
              خوش آمدید!
            </h2>
            <p className="text-sm text-gray-70">
              برای ادامه شماره تلفن خود را وارد کنید
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="flex text-sm mb-2 text-black">شماره تلفن</label>
              <div className="flex items-center border border-gray-50 rounded-lg px-3 py-1 focus-within:ring-1 focus-within:ring-gray-70">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="09XXXXXXXXX"
                  {...register("phoneNumber")}
                  className="flex-1 min-w-0 bg-transparent text-gray-600 border-white focus:outline-none focus:ring-0"
                  dir="ltr"
                />
                <LuPhone className="text-gray-70 shrink-0" size={18} />
              </div>
              {errors.phoneNumber && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="success"
              disabled={isSubmitting}
              className="w-full justify-center"
            >
              {isSubmitting ? "در حال ارسال..." : "ارسال کد"}
              <LuArrowLeft size={18} />
            </Button>
          </form>
        </div>
      </div>

      <div className="flex justify-center pb-8">
        <img src={bpmLogo} alt="به پرداخت ملت" className="h-15" />
      </div>
    </div>
  );
};

export default LoginPage;
