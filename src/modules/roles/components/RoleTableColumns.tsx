import type { Role } from "../roleTypes";
import type { Column } from "../../../components/tables";

export const columns: Column<Role>[] = [
  {
    key: "id",
    title: "شناسه",
    dataIndex: "id",
    width: 80,
    align: "center",
  },
  {
    key: "roleName",
    title: "نام نقش",
    dataIndex: "roleName",
  },
  {
    key: "status",
    title: "وضعیت",
    dataIndex: "status",
    align: "center",
    render: (value) => (
      <span
        className={[
          "px-2 py-1 rounded-full text-xs",
          value === "active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700",
        ].join(" ")}
      >
        {value === "active" ? "فعال" : "غیرفعال"}
      </span>
    ),
  },
  {
    key: "permissions",
    title: "مجوزها",
    dataIndex: "permissions",
  },
];
