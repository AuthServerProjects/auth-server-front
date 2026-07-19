import type { Session } from "../sessionTypes";
import Badge from "../../../components/Badge/Badge";
import SessionPopUpMenu from "./SessionPopUpMenu";
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
    render: (value) => {
      const isActive = value === "Success";
      return (
        <Badge
          variant={isActive ? "success" : "danger"}
          label={isActive ? "فعال" : "غیرفعال"}
        />
      );
    },
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
    render: (_, row) => <SessionPopUpMenu session={row} />,
  },
];
