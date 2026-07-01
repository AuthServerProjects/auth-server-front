export type Variant =
  | "success"
  | "danger"
  | "info"
  | "neutral"
  | "warning"
  | "ghost"
  | "secondary";

export const variantBg: Record<Variant, string> = {
  success: "bg-green-5",
  danger: "bg-red-50",
  info: "bg-blue-50",
  neutral: "bg-gray-50",
  warning: "bg-yellow-50",
  ghost: "bg-gray-50",
  secondary: "bg-gray-100",
};

export const variantText: Record<Variant, string> = {
  success: "text-green-10",
  danger: "text-red-700",
  info: "text-blue-700",
  neutral: "text-gray-700",
  warning: "text-yellow-700",
  ghost: "text-black-80",
  secondary: "text-white",
};

export const variantSoft: Record<Variant, string> = {
  success: "bg-green-5 text-green-10",
  danger: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
  neutral: "bg-gray-100 text-gray-700",
  warning: "bg-yellow-100 text-yellow-700",
  ghost: "bg-gray-50 text-black-80",
  secondary: "bg-gray-100 text-white",
};

export const variantSolid: Record<Variant, string> = {
  success: "bg-green-10 text-white",
  danger: "bg-red-500 text-white",
  info: "bg-blue-500 text-white",
  neutral: "bg-gray-500 text-white",
  warning: "bg-orange-500 text-white",
  ghost: "bg-gray-50 text-black-80",
  secondary: "bg-gray-100 text-white",
};
