import { LuCheck, LuX } from "react-icons/lu";

import type { Client } from "../clientTypes";
import Switch from "../../../components/Switch";
import ClientPopUpMenu from "./ClientPopUpMenu";
import Badge from "../../../components/Badge/Badge";
import type { Column } from "../../../components/tables";

export const getColumns = (
  onStatusChange: (clientId: string) => void,
  onRefresh: () => void,
): Column<Client>[] => [
  {
    key: "id",
    title: "شناسه",
    dataIndex: "id",
    width: 80,
    align: "center",
  },
  {
    key: "clientId",
    title: "شناسه کلاینت",
    dataIndex: "clientId",
  },
  {
    key: "grantTypes",
    title: "انواع مجوز",
    dataIndex: "authorizationGrantTypes",
    render: (value) =>
      !value?.length ? (
        "-"
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-1 items-start">
            {value.map((g) => (
              <Badge key={g} variant="success" label={g} />
            ))}
          </div>
        </div>
      ),
  },
  {
    key: "scopes",
    title: "محدوده‌ها",
    dataIndex: "scopes",
    render: (value) =>
      !value?.length ? (
        "-"
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-1 items-start">
            {value.map((s) => (
              <Badge key={s} variant="danger" label={s} />
            ))}
          </div>
        </div>
      ),
  },
  {
    key: "authMethods",
    title: "روش احراز",
    dataIndex: "clientAuthenticationMethods",
    render: (value) =>
      !value?.length ? (
        "-"
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-1 items-start">
            {value.map((m) => (
              <Badge key={m} variant="info" label={m} />
            ))}
          </div>
        </div>
      ),
  },
  {
    key: "tokenTimes",
    title: "زمان توکن (دقیقه)",
    dataIndex: "setting",
    align: "center",
    render: (value) =>
      !value ? (
        "-"
      ) : (
        <div className="flex flex-col items-center text-gray-100">
          <div className="flex flex-col items-satrt">
            <div className="flex gap-1">
              <span className="text-gray-70">AccessToken: </span>
              <span>{value.accessTokenTimeToLive}</span>
            </div>
            <div className="flex gap-1">
              <span className="text-gray-70">RefreshToken: </span>
              <span>{value.refreshTokenTimeToLive}</span>
            </div>
            <div className="flex gap-1">
              <span className="text-gray-70">GrantTypeCode: </span>
              <span>{value.authorizationCodeTimeToLive}</span>
            </div>
          </div>
        </div>
      ),
  },
  {
    key: "pkce",
    title: "PKCE",
    dataIndex: "setting",
    align: "center",
    width: 80,
    render: (value) =>
      value?.requireProofKey ? (
        <LuCheck className="text-green-10 inline" size={18} />
      ) : (
        <LuX className="text-gray-70 inline" size={18} />
      ),
  },
  {
    key: "reuseRefreshTokens",
    title: "استفاده مجدد Refresh Token",
    dataIndex: "setting",
    align: "center",
    width: 80,
    render: (value) =>
      value?.reuseRefreshTokens ? (
        <LuCheck className="text-green-10 inline" size={18} />
      ) : (
        <LuX className="text-gray-70 inline" size={18} />
      ),
  },
  {
    key: "requireAuthoConsent",
    title: "نیاز به رضایت کاربر",
    dataIndex: "setting",
    align: "center",
    width: 80,
    render: (value) =>
      value?.requireAuthorizationConsent ? (
        <LuCheck className="text-green-10 inline" size={18} />
      ) : (
        <LuX className="text-gray-70 inline" size={18} />
      ),
  },
  {
    key: "status",
    title: "وضعیت",
    dataIndex: "isEnabled",
    align: "center",
    render: (value, record) => (
      <Switch
        label={value ? "فعال" : "غیرفعال"}
        checked={value}
        onCheckedChange={() => onStatusChange(record.clientId)}
      />
    ),
  },
  {
    key: "actions",
    title: "عملیات",
    align: "center",
    width: 80,
    render: (_, row) => <ClientPopUpMenu client={row} onChanged={onRefresh} />,
  },
];
