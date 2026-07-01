import { LuRefreshCcw } from "react-icons/lu";
import { CgFileDocument } from "react-icons/cg";

import { mockLog } from "./logsData";
import LogsTable from "./components/LogsTable";
import PagesHeader from "../../components/PagesHeader";
import TablesHeader from "../../components/TablesHeader";

const LogsMainPage = () => {
  return (
    <div className="flex flex-col w-full p-6">
      <PagesHeader
        title="مدیریت لاگها"
        icon={<CgFileDocument size={24} />}
        buttonLabel="بازخوانی"
        buttonIcon={<LuRefreshCcw />}
        modalHandling={() => console.log("Reload logs clicked")}
      />
      <div className="flex flex-col w-full border border-gray-50 bg-white rounded-lg mt-4">
        <TablesHeader placeHolder="جستجو با نام کاربر یا عملیات" />
        <LogsTable data={mockLog} />
      </div>
    </div>
  );
};

export default LogsMainPage;
