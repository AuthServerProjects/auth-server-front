import type { Session } from "../sessionTypes";
import SessionActionsMenu from "./SessionActionsMenu";
import type { Column } from "../../../components/tables";
import { renderDate } from "../../../utils/convertDateToPersian";

export const columns: Column<Session>[] = [
  {
    key: "id",
    title: "شناسه",
    dataIndex: "id",
    width: 80,
    align: "center",
  },
  {
    key: "userName",
    title: "نام کاربری",
    dataIndex: "userName",
  },
  {
    key: "client",
    title: "کلاینت",
    dataIndex: "client",
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
    key: "accessTokenIssuedAt",
    title: "تاریخ صدور اکسس توکن",
    dataIndex: "accessTokenIssuedAt",
    render: renderDate,
  },
  {
    key: "accessTokenExpiresAt",
    title: "تاریخ انقضا اکسس توکن",
    dataIndex: "accessTokenExpiresAt",
    render: renderDate,
  },
  {
    key: "refreshTokenIssuedAt",
    title: "تاریخ صدور رفرش توکن",
    dataIndex: "refreshTokenIssuedAt",

    render: renderDate,
  },
  {
    key: "refreshTokenExpiresAt",
    title: "تاریخ انقضا رفرش توکن",
    dataIndex: "refreshTokenExpiresAt",
    render: renderDate,
  },
  {
    key: "actions",
    title: "عملیات",
    align: "center",
    width: 100,
    render: (_, row) => <SessionActionsMenu session={row} />,
  },
];
