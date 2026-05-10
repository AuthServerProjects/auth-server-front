import { FiUser } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const Header = () => {
  return (
    <div className="flex bg-white h-fit border-b border-gray-50 py-3 px-4 w-full">
      <div className="h-fit w-65">
        <img src="src/assets/BPM.svg" />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="px-2 py-2 text-gray-100 font-bold">
          پنل مدیریت احراز هویت
        </div>

        <div className="flex items-center space-x-3">
          <FaRegMoon className="text-gray-100 ml-6 !text-xl" />
          <div className="bg-gray-50 p-2.5 rounded-full">
            <FiUser className="text-gray-100 !text-xl" />
          </div>
          <div className="text-gray-200 font-bold mt-1">Super Admin</div>
          <IoIosArrowDown className="text-gray-100" />
        </div>
      </div>
    </div>
  );
};

export default Header;
