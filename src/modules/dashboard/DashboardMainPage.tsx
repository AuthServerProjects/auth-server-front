import { CgCloseO } from "react-icons/cg";
import { useEffect, useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

import type {
  DashboardStats,
  ClientDashboardStats,
  RecentActivity,
  TopFailedIp,
} from "./dashboardTypes";
import Badge from "../../components/Badge/Badge";
import { dashboardService } from "./dashboardService";
import CardComponent from "./components/CardComponent";
import LineChart from "../../components/charts/LineChart";
import Table, { type Column } from "../../components/tables";
import { renderDate } from "../../utils/convertDateToPersian";
import { useSelectedClient } from "../../context/SelectedClientContext";

const DashboardMainPage = () => {
  const { selectedClient } = useSelectedClient();
  const isPerClient = !!selectedClient;

  const [general, setGeneral] = useState<DashboardStats | null>(null);
  const [clientStats, setClientStats] = useState<ClientDashboardStats | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const load = async () => {
      try {
        if (isPerClient) {
          setClientStats(await dashboardService.getClientStats());
          setGeneral(null);
        } else {
          setGeneral(await dashboardService.getStats());
          setClientStats(null);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isPerClient, selectedClient?.clientId]);

  const cardComponents = isPerClient
    ? [
        {
          title: "کاربران فعال",
          count: clientStats?.activeUsers ?? 0,
          icon: <FiCheckCircle />,
          iconClassName: "bg-green-100 text-green-500",
        },
        {
          title: "ورودهای موفق (امروز)",
          count: clientStats?.loginsToday ?? 0,
          icon: <FiCheckCircle />,
          iconClassName: "bg-green-100 text-green-500",
        },
        {
          title: "ورودهای ناموفق (امروز)",
          count: clientStats?.failedLoginsToday ?? 0,
          icon: <FiAlertCircle />,
          iconClassName: "bg-orange-100 text-orange-500",
        },
        {
          title: "نشست های لغو شده (امروز)",
          count: clientStats?.sessionsRevokedToday ?? 0,
          icon: <CgCloseO />,
          iconClassName: "bg-gray-50 text-gray-300",
        },
      ]
    : [
        {
          title: "ناموفق (ساعت گذشته)",
          count: general?.failedOtpLastHour ?? 0,
          icon: <FiAlertTriangle />,
          iconClassName: "bg-red-100 text-red-500",
        },
        {
          title: "ناموفق (امروز)",
          count: general?.failedOtpToday ?? 0,
          icon: <FiAlertCircle />,
          iconClassName: "bg-orange-100 text-orange-500",
        },
        {
          title: "ورودهای موفق (امروز)",
          count: general?.successfulLoginsToday ?? 0,
          icon: <FiCheckCircle />,
          iconClassName: "bg-green-100 text-green-500",
        },
        {
          title: "نشست های لغو شده (امروز)",
          count: general?.sessionsRevokedToday ?? 0,
          icon: <CgCloseO />,
          iconClassName: "bg-gray-50 text-gray-300",
        },
      ];

  const recentActivity: RecentActivity[] = isPerClient
    ? (clientStats?.recentActivity ?? [])
    : (general?.recentActivity ?? []);

  const topFailedIps: TopFailedIp[] = general?.topFailedIps ?? [];

  const activityColumns: Column<RecentActivity>[] = [
    { key: "action", title: "عملیات", dataIndex: "action" },
    { key: "username", title: "کاربر", dataIndex: "username" },
    ...(isPerClient
      ? []
      : [
          {
            key: "clientName",
            title: "کلاینت",
            dataIndex: "clientName",
          } as Column<RecentActivity>,
        ]),
    { key: "ipAddress", title: "IP", dataIndex: "ipAddress" },
    {
      key: "success",
      title: "وضعیت",
      dataIndex: "success",
      align: "center",
      render: (value) => (
        <Badge
          variant={value ? "success" : "danger"}
          label={value ? "موفق" : "ناموفق"}
        />
      ),
    },
    {
      key: "createdAt",
      title: "زمان",
      dataIndex: "createdAt",
      render: (value) => renderDate(value),
    },
  ];

  const topIpColumns: Column<TopFailedIp>[] = [
    { key: "ipAddress", title: "IP", dataIndex: "ipAddress" },
    {
      key: "failedCount",
      title: "تعداد خطا",
      dataIndex: "failedCount",
      align: "center",
    },
  ];

  // charts stay hardcoded — backend returns no time-series yet
  const series = [{ name: "تعداد", data: [50, 0, 20, 40, 60, 80] }];
  const dataLabels = series[0].data.map((v) => v.toLocaleString("fa-IR"));
  const categories: any = [
    "00:00",
    "04:00",
    "08:00",
    "12:00",
    "16:00",
    "20:00",
  ];

  return (
    <div className="p-1">
      <div className="w-[86vw] h-screen p-4">
        <div className="grid grid-cols-4 gap-4">
          {cardComponents.map((card, index) => (
            <CardComponent
              key={index}
              title={card.title}
              count={card.count}
              icon={card.icon}
              iconClassName={card.iconClassName}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white border border-gray-50 rounded-lg">
            <div className="pt-6 text-black font-bold ">آمار ورودها</div>
            <LineChart
              type="area"
              isHorizontal={false}
              chartHeight="380px"
              chartName="logins"
              color="#0445f9"
              titleTransaction="مبلغ"
              categories={categories}
              colors={["#F05252", "#4ABACAD", "#C4CBD2"]}
              series={series}
              dataLabels={dataLabels.map((label) => ({ text: label }))}
              showLabels={undefined}
              legend={undefined}
              yFormatter={(val: any) => val.toLocaleString("fa-IR")}
            />
          </div>
          <div className="bg-white border border-gray-50 rounded-lg">
            <div className="pt-6 text-black font-bold ">آمار خطاها</div>
            <LineChart
              type="area"
              isHorizontal={false}
              chartHeight="380px"
              chartName="errors"
              color="#0445f9"
              titleTransaction="مبلغ"
              categories={categories}
              colors={["#F05252", "#4ABACAD", "#C4CBD2"]}
              series={series}
              dataLabels={dataLabels.map((label) => ({ text: label }))}
              showLabels={undefined}
              legend={undefined}
              yFormatter={(val: any) => val.toLocaleString("fa-IR")}
            />
          </div>
        </div>

        {!isPerClient && (
          <div className="bg-white border border-gray-50 mt-4 p-6 rounded-lg">
            <div className="text-black pb-6">پرتکرارترین IPهای ناموفق</div>
            <Table<TopFailedIp>
              columns={topIpColumns}
              data={topFailedIps}
              rowKey="ipAddress"
              striped
              loading={loading}
              className="rounded-t-lg"
            />
          </div>
        )}

        <div className="bg-white border border-gray-50 mt-4 p-6 rounded-lg">
          <div className="text-black pb-6">فعالیت های اخیر</div>
          <Table<RecentActivity>
            columns={activityColumns}
            data={recentActivity}
            rowKey="createdAt"
            striped
            loading={loading}
            className="rounded-t-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardMainPage;
