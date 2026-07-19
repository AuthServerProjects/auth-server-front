import { FaRegMoon } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { HiOutlineLockClosed } from "react-icons/hi";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

import bpmLogo from "../../assets/BPM.svg";

import {
  ADMIN_PANEL_CLIENT_ID,
  ADMIN_PANEL_REDIRECT_URI,
  PKCE_VERIFIER_KEY,
  OAUTH_STATE_KEY,
} from "./authConfig";
import { authService } from "./authService";
import { setCookie } from "../../utils/cookies";
import Button from "../../components/Button/Button";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 90;

const OtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = (location.state as { phoneNumber?: string })?.phoneNumber;

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  if (!phoneNumber) return <Navigate to="/login" replace />;

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const setDigitAt = (index: number, value: string) => {
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned) {
      setDigitAt(index, "");
      return;
    }
    setDigitAt(index, cleaned[cleaned.length - 1]);
    setError(null);
    if (index < OTP_LENGTH - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
    if (e.key === "ArrowRight" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill("");
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputsRef.current[focusIndex]?.focus();
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < OTP_LENGTH) {
      setError("لطفا کد کامل را وارد کنید");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      // 1) verify OTP -> get authorization code
      const verifyRes = await authService.verifyOtp({
        phoneNumber: phoneNumber!,
        otp: code,
        state: sessionStorage.getItem(OAUTH_STATE_KEY) || "",
      });

      // 2) CSRF: returned state must match what we sent
      const savedState = sessionStorage.getItem(OAUTH_STATE_KEY);
      if (verifyRes.state !== savedState) {
        setError("خطای امنیتی (state نامعتبر)");
        return;
      }

      // 3) exchange authorization code -> access token (PKCE)
      const codeVerifier = sessionStorage.getItem(PKCE_VERIFIER_KEY) ?? "";
      const token = await authService.exchangeToken({
        code: verifyRes.authorizationCode,
        redirectUri: verifyRes.redirectUri || ADMIN_PANEL_REDIRECT_URI,
        clientId: ADMIN_PANEL_CLIENT_ID,
        codeVerifier,
      });

      // 4) store token (cookie — matches axios interceptor; later: httpOnly from backend)
      setCookie("access_token", token.access_token, {
        days: token.expires_in / 86400, // expires_in is seconds -> days
        sameSite: "Lax",
      });

      // 5) cleanup PKCE + state
      sessionStorage.removeItem(PKCE_VERIFIER_KEY);
      sessionStorage.removeItem(OAUTH_STATE_KEY);

      // 6) go to dashboard
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("verify failed", err);
      setError("کد وارد شده صحیح نیست");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = () => {
    console.log("resend to", phoneNumber);
    setDigits(Array(OTP_LENGTH).fill(""));
    setError(null);
    setSecondsLeft(RESEND_SECONDS);
    inputsRef.current[0]?.focus();
  };

  const formatTime = (s: number) => {
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
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
              تایید شماره تلفن
            </h2>
            <p className="text-xs text-gray-70">
              کد ۶ رقمی ارسال شده به شماره{" "}
              <span dir="ltr" className="text-gray-300">
                {phoneNumber}
              </span>{" "}
              را وارد کنید
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-center gap-2" dir="ltr">
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputsRef.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    className="w-11 h-12 text-center text-lg font-bold border border-gray-50 rounded-lg text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-70"
                  />
                ))}
              </div>
              {error && (
                <p className="text-xs text-red-500 mt-2 text-center">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="success"
              disabled={isSubmitting || digits.join("").length < OTP_LENGTH}
              className="w-full justify-center"
            >
              {isSubmitting ? "در حال بررسی..." : "تایید و ورود"}
              <LuArrowLeft size={18} />
            </Button>

            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="flex items-center gap-1 text-gray-70 hover:text-gray-300 cursor-pointer transition-colors"
              >
                <LuArrowRight size={14} />
                تغییر شماره
              </button>

              {secondsLeft > 0 ? (
                <span className="text-gray-70">
                  ارسال مجدد کد تا {formatTime(secondsLeft)}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-green-10 hover:underline cursor-pointer"
                >
                  ارسال مجدد کد
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-center pb-8">
        <img src={bpmLogo} alt="به پرداخت ملت" className="h-10" />
      </div>
    </div>
  );
};

export default OtpPage;
