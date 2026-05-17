type Props =
  | { type: "status"; value: "active" | "inactive" }
  | { type: "result"; value: "success" | "failed" };

const Badge = (props: Props) => {
  let isSuccess = false;
  let label = "";

  if (props.type === "status") {
    isSuccess = props.value === "active";
    label = isSuccess ? "فعال" : "غیرفعال";
  } else {
    isSuccess = props.value === "success";
    label = isSuccess ? "موفق" : "ناموفق";
  }

  return (
    <span
      className={[
        "px-2 py-1 rounded-full text-xs",
        isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
      ].join(" ")}
    >
      {label}
    </span>
  );
};

export default Badge;
