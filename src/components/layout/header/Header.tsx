import { FiUser } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LuUser, LuLogOut, LuChevronDown } from "react-icons/lu";

import PopUpMenu from "../../popUpMenu/PopUpMenu";
import type { PopUpMenuItem } from "../../popUpMenu/types";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: clear tokens / call logout API
    localStorage.removeItem("token");
    navigate("/login");
  };

  const userMenuItems: PopUpMenuItem[] = [
    {
      key: "profile",
      label: "پروفایل",
      icon: <LuUser size={18} />,
      onClick: () => navigate("/profile"),
    },
    {
      key: "logout",
      label: "خروج",
      icon: <LuLogOut size={18} />,
      onClick: handleLogout,
      danger: true,
    },
  ];

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
          <FaRegMoon className="text-gray-100 ml-6 !text-xl cursor-pointer" />

          <PopUpMenu
            items={userMenuItems}
            align="end"
            trigger={
              <button
                type="button"
                className="group flex items-center gap-3 rounded-lg px-2 py-1 cursor-pointer transition-colors"
              >
                <div className="bg-gray-50 p-2.5 rounded-full">
                  <FiUser className="text-gray-100 !text-xl" />
                </div>
                <div className="text-gray-200 font-bold mt-1">Super Admin</div>
                <LuChevronDown
                  className="text-gray-70 shrink-0 transition-transform group-data-[state=open]:rotate-180"
                  size={18}
                />
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
