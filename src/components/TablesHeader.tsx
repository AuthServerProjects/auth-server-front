import { LuSearch } from "react-icons/lu";

import SVG from "./SVG/SVG";
import Button from "./Button/Button";

type Props = {
  placeHolder: string;
};

const TablesHeader = ({ placeHolder }: Props) => {
  return (
    <div>
      <div className="flex justify-between p-4">
        <div className="relative">
          <LuSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={placeHolder}
            className="w-full py-2 pl-4 pr-10 border border-gray-70 rounded-lg focus:ring-0"
          />
        </div>
        <Button
          variant="success"
          icon={<SVG name="DownloadIcon" />}
          onClick={() => console.log("clicked")}
        >
          خروجی اکسل
        </Button>
      </div>
    </div>
  );
};

export default TablesHeader;
