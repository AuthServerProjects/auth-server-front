import { LuRefreshCcw, LuSearch } from "react-icons/lu";
import { CgFileDocument } from "react-icons/cg";
import SVG from "../../components/SVG/SVG";
import LogsTable from "./components/LogsTable";
import { mockLog } from "./logsData";

const LogsMainPage = () => {
  return (
    <div className="flex flex-col w-full p-6">
      <div className="flex justify-between">
        <div className="flex text-black-100 space-x-3 font-bold">
          <CgFileDocument size={24} />
          <h2>مدیریت لاگها</h2>
        </div>
        <button
          type="button"
          onClick={() => console.log("clicked")}
          className="flex items-center gap-2 bg-gray-100 text-white px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer"
        >
          <LuRefreshCcw />
          بازخوانی
        </button>
      </div>

      <div className="flex flex-col w-full border border-gray-50 bg-white rounded-lg mt-4">
        <div className="flex justify-between p-4">
          <div className="relative">
            <LuSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="جستجو با نام کاربر یا عملیات"
              className="w-full py-2 pl-4 pr-10 border rounded-lg"
            />
          </div>
          <button
            type="button"
            onClick={() => console.log("clicked")}
            className="flex items-center gap-2 bg-green-10 text-white px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer"
          >
            <SVG name="DownloadIcon" />
            خروجی اکسل
          </button>
        </div>
        <LogsTable data={mockLog} />
      </div>
    </div>
  );
};

export default LogsMainPage;
