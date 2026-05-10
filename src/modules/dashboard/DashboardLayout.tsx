import CardComponent from "./components/CardComponent";
import { CgCloseO } from "react-icons/cg";
import { FiAlertTriangle } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";

const DashboardLayout = () => {
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
      </div>
    </div>
  );
};

export default DashboardLayout;
