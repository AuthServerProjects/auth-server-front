import { Command } from "cmdk";
import { FiServer } from "react-icons/fi";
import { LuChevronDown } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";

export type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  options: SelectOption[];
  value: SelectOption | null;
  onChange: (option: SelectOption | null) => void;
  placeholder?: string;
  emptyText?: string;
  searchable?: boolean;
};

const SelectBox = ({
  options,
  value,
  onChange,
  placeholder = "انتخاب کنید",
  emptyText = "موردی یافت نشد",
  searchable = true,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const select = (option: SelectOption) => {
    onChange(option);
    setIsOpen(false);
    setQuery("");
  };

  const filtered = searchable
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  return (
    <Command
      shouldFilter={false}
      className="relative w-full"
      ref={containerRef}
    >
      {/* Trigger */}
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 w-full min-h-10 border border-gray-50 
        rounded-lg px-3 cursor-text focus-within:ring-1 focus-within:ring-gray-70 bg-white"
      >
        <div className="flex items-center flex-1 min-w-0">
          {isOpen && searchable ? (
            <Command.Input
              value={query}
              onValueChange={setQuery}
              autoFocus
              placeholder={value?.label ?? placeholder}
              className="w-full text-sm text-gray-100 border border-white rounded-lg px-1 focus:outline-none focus:ring-0"
            />
          ) : (
            <span
              className={`text-sm ${value ? "text-gray-300" : "text-gray-70"}`}
            >
              {value?.label ?? placeholder}
            </span>
          )}
        </div>

        <LuChevronDown
          className={`text-gray-70 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          size={18}
        />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-1 left-0 right-0 z-50">
          <Command.List
            className="max-h-50 overflow-y-auto flex flex-col  border border-gray-50 rounded-lg bg-white p-1 
    scrollbar-thin scrollbar-thumb-gray-50 scrollbar-track-transparent
    hover:scrollbar-thumb-gray-80 scrollbar-thumb-rounded-full"
          >
            {filtered.length === 0 && (
              <Command.Empty className="text-sm text-gray-300 p-2">
                {emptyText}
              </Command.Empty>
            )}

            {filtered.map((opt) => {
              const isSelected = value?.value === opt.value;
              return (
                <Command.Item
                  key={opt.value}
                  value={opt.value}
                  onSelect={() => select(opt)}
                  className={`flex items-center h-10 text-sm gap-3 p-2 text-gray-100 rounded-lg hover:bg-gray-30 cursor-pointer ${
                    isSelected ? "bg-gray-50 hover:bg-gray-50" : ""
                  }`}
                >
                  <FiServer size={18} />
                  <span>{opt.label}</span>
                </Command.Item>
              );
            })}
          </Command.List>
        </div>
      )}
    </Command>
  );
};

export default SelectBox;
