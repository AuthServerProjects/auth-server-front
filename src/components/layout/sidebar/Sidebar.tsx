import {
  LuKey,
  LuLayoutDashboard,
  LuUserCog,
  LuBuilding2,
} from "react-icons/lu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CgFileDocument } from "react-icons/cg";
import { FiServer, FiClock, FiUsers } from "react-icons/fi";

import SelectBox, { type SelectOption } from "../../selectBox/SelectBox";
import { useSelectedClient } from "../../../context/SelectedClientContext";
import { clientService } from "../../../modules/clients/clientService";
import type { ClientDropdown } from "../../../modules/clients/clientTypes";

const Sidebar = () => {
  const generalMenu = [
    {
      id: 1,
      href: "/dashboard",
      icon: <LuLayoutDashboard />,
      label: "داشبورد",
    },
    {
      id: 2,
      href: "/users?isFromClient=false",
      icon: <FiUsers />,
      label: "کاربران",
    },
    { id: 3, href: "/clients", icon: <FiServer />, label: "کلاینت ها" },
    { id: 4, href: "/sessions", icon: <FiClock />, label: "نشست ها" },
  ];

  const clientMenu = [
    {
      id: 5,
      href: "/dashboard",
      icon: <LuLayoutDashboard />,
      label: "داشبورد",
    },
    {
      id: 6,
      href: "/users?isFromClient=true",
      icon: <FiUsers />,
      label: "کاربران",
    },
    { id: 7, href: "/roles", icon: <LuUserCog />, label: "نقش ها" },
    { id: 8, href: "/permissions", icon: <LuKey />, label: "مجوزها" },
    { id: 9, href: "/sessions", icon: <FiClock />, label: "نشست ها" },
    { id: 10, href: "/logs", icon: <CgFileDocument />, label: "لاگ ها" },
  ];

  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [clients, setClients] = useState<ClientDropdown[]>([]);
  const { selectedClient, setSelectedClient } = useSelectedClient();

  const navigate = useNavigate();

  // Load the admin's clients for the dropdown
  useEffect(() => {
    clientService
      .getMyClients()
      .then(setClients)
      .catch((err) => console.error("failed to load clients", err));
  }, []);

  const handleChangeRoute = (id: number, href: string) => {
    setActiveItem(id);
    navigate(href);
  };

  // Build dropdown options from real API data
  const clientListOptions: SelectOption[] = clients.map((c) => ({
    value: String(c.clientId),
    label: c.clientName,
  }));

  // Map context -> SelectBox value
  const selectedOption: SelectOption | null = selectedClient
    ? {
        value: String(selectedClient.clientId),
        label: selectedClient.clientName,
      }
    : null;

  const handleClientChange = (option: SelectOption | null) => {
    if (!option) {
      setSelectedClient(null);
      return;
    }
    setSelectedClient({
      clientId: Number(option.value),
      clientName: option.label,
    });
  };

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
                onClick={() => handleChangeRoute(item.id, item.href)}
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
            value={selectedOption}
            onChange={handleClientChange}
            placeholder="انتخاب کلاینت"
            icon={<FiServer size={18} />}
          />

          <div className="pt-1.5">
            {clientMenu.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleChangeRoute(item.id, item.href)}
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
