import { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { FiServer } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";
import { LuShield } from "react-icons/lu";
import { LuKey } from "react-icons/lu";
import { CgFileDocument } from "react-icons/cg";
import SelectBox from "../../selectBox/SelectBox";

const Sidebar = () => {
  const generalMenu = [
    { id: 1, icon: <LuLayoutDashboard />, label: "داشبورد" },
    { id: 2, icon: <FiUsers />, label: "کاربران" },
    { id: 3, icon: <FiServer />, label: "کلاینت ها" },
    { id: 4, icon: <FiClock />, label: "نشست ها" },
  ];

  const clientMenu = [
    { id: 5, icon: <LuLayoutDashboard />, label: "داشبورد" },
    { id: 6, icon: <FiUsers />, label: "کاربران" },
    { id: 7, icon: <LuShield />, label: "نقش ها" },
    { id: 8, icon: <LuKey />, label: "مجوزها" },
    { id: 9, icon: <FiClock />, label: "نشست ها" },
    { id: 10, icon: <CgFileDocument />, label: "لاگ های حسابرسی" },
  ];

  const clientListOptions = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    // SideBar
    <div className="bg-white h-screen border-l border-gray-50 w-65">
      <div className="px-2">
        {/* General */}
        <div className="py-1.5 border-b border-gray-50">
          {generalMenu.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`flex text-gray-300 font-bold mx-1 my-1 items-center space-x-4 py-2.5 px-3 rounded-lg cursor-pointer 
                ${activeItem === item.id ? "bg-gray-50" : "hover:bg-gray-30"}`}
              >
                <div>{item.icon}</div>
                <div>{item.label}</div>
              </div>
            );
          })}
        </div>

        {/* PerClient */}
        <div className="py-1.5">
          <div className="flex text-gray-70 items-center space-x-4 py-2.5 px-3">
            <LuBuilding2 />
            <div>مدیریت کلاینت</div>
          </div>

          <SelectBox
            options={clientListOptions}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />

          <div className="pt-1.5">
            {clientMenu.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`flex text-gray-300 font-bold mx-1.5 my-0.5 items-center space-x-4 py-2.5 px-3 rounded-lg cursor-pointer
          ${isActive ? "bg-gray-50" : "hover:bg-gray-30"}`}
                >
                  <div>{item.icon}</div>
                  <div>{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
