import { Command } from "cmdk";
import { IoClose } from "react-icons/io5";
import { LuChevronDown } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";

import SVG from "./SVG/SVG";

type Props = {
  options: readonly string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  emptyText?: string;
};

const MultiSelect = ({
  options,
  value,
  onChange,
  placeholder = "انتخاب کنید",
  emptyText = "موردی یافت نشد",
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

  const toggle = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const remove = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Command
      shouldFilter={false}
      className="relative w-full"
      ref={containerRef}
    >
      {/* Trigger: chevron on the left (RTL), chips + input fill the rest */}
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 w-full min-h-10 border border-gray-50 rounded-lg px-3 py-1.5 cursor-text focus-within:ring-1 focus-within:ring-gray-70 bg-white"
      >
        <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
          {value.map((val) => (
            <div
              key={val}
              className="flex items-center gap-1 bg-green-5 text-green-10 text-xs rounded-md px-2 py-0.5"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  remove(val);
                }}
                aria-label={`حذف ${val}`}
                className="hover:bg-green-10/10 rounded-full cursor-pointer"
              >
                <IoClose size={14} />
              </button>
              <span>{val}</span>
            </div>
          ))}

          {(value.length === 0 || query.length > 0 || isOpen) && (
            <Command.Input
              value={query}
              onValueChange={(v) => {
                setQuery(v);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder={value.length === 0 ? placeholder : ""}
              className="flex-1 min-w-32 h-1 max-h-2 bg-transparent text-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-white border border-white"
            />
          )}
        </div>
        <LuChevronDown
          className={`text-gray-70 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
          size={18}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full mt-1 left-0 right-0 z-50">
          <Command.List
            className="max-h-42 overflow-y-auto flex flex-col border border-gray-50 rounded-lg gap-2 bg-white
              scrollbar-thin scrollbar-thumb-gray-50 scrollbar-track-transparent
              hover:scrollbar-thumb-gray-80 scrollbar-thumb-rounded-full"
          >
            {filtered.length === 0 && (
              <Command.Empty className="text-sm text-gray-100 p-2">
                {emptyText}
              </Command.Empty>
            )}

            {filtered.map((opt) => {
              const isSelected = value.includes(opt);
              return (
                <Command.Item
                  key={opt}
                  value={opt}
                  onSelect={() => toggle(opt)}
                  className={`flex items-center gap-2 p-2.5 m-2 border border-gray-50 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? "bg-green-20" : ""
                  }`}
                >
                  {isSelected ? (
                    <SVG name="tickIcon" />
                  ) : (
                    <SVG name="squareIcon" />
                  )}
                  <span className="text-gray-100">{opt}</span>
                </Command.Item>
              );
            })}
          </Command.List>
        </div>
      )}
    </Command>
  );
};

export default MultiSelect;
