import type { Session } from "../sessionTypes";
import SessionPopUpMenu from "./SessionPopUpMenu";
import type { Column } from "../../../components/tables";
import { renderDate } from "../../../utils/convertDateToPersian";

export const getColumns = (onRefresh: () => void): Column<Session>[] => [
  {
    key: "id",
    title: "شناسه",
    dataIndex: "id",
    width: 80,
    align: "center",
  },
  {
    key: "principalName",
    title: "نام کاربری",
    dataIndex: "principalName",
  },
  {
    key: "registeredClientId",
    title: "کلاینت",
    dataIndex: "registeredClientId",
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
    render: (_, row) => (
      <SessionPopUpMenu session={row} onRevoked={onRefresh} />
    ),
  },
];
