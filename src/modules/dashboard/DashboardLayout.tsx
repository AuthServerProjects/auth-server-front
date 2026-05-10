import CardComponent from "./components/CardComponent";
import { CgCloseO } from "react-icons/cg";
import { FiAlertTriangle } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import LineChart from "../../components/charts/LineChart";

const DashboardLayout = () => {
  const series = [
    {
      name: "تعداد",
      data: [50, 0, 20, 40, 60, 80],
    },
  ];

  const dataLabels = series[0].data.map((value) =>
    value.toLocaleString("fa-IR"),
  );
  const categories: any = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"];

  return (
    <div className="p-1">
      <div className="w-[86vw] h-screen p-4">
        <div className="grid grid-cols-4 gap-4">
          <CardComponent
            title="ناموفق (ساعت گذشته)"
            count={0}
            icon={<FiAlertTriangle />}
            iconClassName="bg-red-100 text-red-500"
          />
          <CardComponent
            title="ناموفق (امروز)"
            count={0}
            icon={<FiAlertCircle />}
            iconClassName="bg-orange-100 text-orange-500"
          />
          <CardComponent
            title="ورودهای موفق (امروز)"
            count={2}
            icon={<FiCheckCircle />}
            iconClassName="bg-green-100 text-green-500"
          />
          <CardComponent
            title="نشست های لغو شده (امروز)"
            count={0}
            icon={<CgCloseO />}
            iconClassName="bg-gray-50 text-gray-300"
          />
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
      </div>
    </div>
  );
};

export default DashboardLayout;
