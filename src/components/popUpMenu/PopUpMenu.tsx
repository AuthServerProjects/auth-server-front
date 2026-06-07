import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FiMoreVertical } from "react-icons/fi";
import type { PopUpMenuProps } from "./types";

const PopUpMenu = ({
  items,
  trigger,
  align = "start",
  side = "bottom",
  className,
}: PopUpMenuProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {trigger ?? (
          <button
            type="button"
            aria-label="منو"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-500 hover:bg-gray-50 
            hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-100 transition"
          >
            <FiMoreVertical />
          </button>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align={align}
          side={side}
          sideOffset={6}
          onClick={(e) => e.stopPropagation()}
          className={[
            "min-w-[180px] bg-white border border-gray-50 rounded-lg shadow-lg py-1 z-50",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className ?? "",
          ].join(" ")}
        >
          {items.map((item) => (
            <div key={item.key}>
              {item.divider && (
                <DropdownMenu.Separator className="h-px bg-gray-50 my-1" />
              )}
              <DropdownMenu.Item
                disabled={item.disabled}
                onSelect={() => item.onClick?.()}
                className={[
                  "flex items-center justify-end gap-2 px-3 py-2 text-sm rounded cursor-pointer select-none outline-none",
                  "data-[highlighted]:bg-gray-30",
                  item.danger
                    ? "text-red-600 data-[highlighted]:bg-red-50"
                    : "text-gray-300",
                  item.disabled ? "opacity-50 cursor-not-allowed" : "",
                ].join(" ")}
              >
                <span>{item.label}</span>
                {item.icon && (
                  <span className="w-4 h-4 flex items-center justify-center">
                    {item.icon}
                  </span>
                )}
              </DropdownMenu.Item>
            </div>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default PopUpMenu;
