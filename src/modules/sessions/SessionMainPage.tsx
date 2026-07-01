import { mockSession } from "./sessionsData";
import { LuRefreshCcw } from "react-icons/lu";

import PagesHeader from "../../components/PagesHeader";
import SessionsTable from "./components/SessionsTable";
import TablesHeader from "../../components/TablesHeader";

const SessionsMainPage = () => {
  return (
    <div className="flex flex-col w-full p-6">
      <PagesHeader
        title="مدیریت نشست‌ها"
        icon={<LuRefreshCcw size={24} />}
        buttonLabel="بازخوانی"
        buttonIcon={<LuRefreshCcw size={20} />}
        modalHandling={() => console.log("Reload sessions clicked")}
      />
      <div className="flex flex-col w-full border border-gray-50 bg-white rounded-lg mt-4">
        <TablesHeader placeHolder="جستجو با شناسه کلاینت" />
        <SessionsTable data={mockSession} />
      </div>
    </div>
  );
};

export default SessionsMainPage;
