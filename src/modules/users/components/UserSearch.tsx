import { Command } from "cmdk";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import SVG from "../../../components/SVG/SVG";
import { useDebounce } from "../../../utils/useDebounce";

export type UserOption = {
  id: number;
  phoneNumber: string;
};

type Props = {
  selectedUsers: UserOption[];
  onChange: (users: UserOption[]) => void;
};

const mockUsers: UserOption[] = [
  { id: 1, phoneNumber: "09365670099" },
  { id: 2, phoneNumber: "09365670088" },
  { id: 3, phoneNumber: "09365670077" },
  { id: 4, phoneNumber: "09121234567" },
  { id: 5, phoneNumber: "09127654321" },
  { id: 6, phoneNumber: "09301112233" },
  { id: 7, phoneNumber: "09304445566" },
];

const searchUsers = async (query: string): Promise<UserOption[]> => {
  if (!query) return [];
  await new Promise((r) => setTimeout(r, 300));
  return mockUsers.filter((u) => u.phoneNumber.includes(query));
};

const sanitizeNumeric = (value: string) => {
  const normalized = value
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0));
  return normalized.replace(/\D/g, "");
};

const UserSearch = ({ selectedUsers, onChange }: Props) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 500);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: results = [], isFetching } = useQuery({
    queryKey: ["users", "search", debouncedQuery],
    queryFn: () => searchUsers(debouncedQuery),
    enabled: debouncedQuery.length > 0,
    staleTime: 60_000,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleUser = (user: UserOption) => {
    const exists = selectedUsers.some((u) => u.id === user.id);
    if (exists) {
      onChange(selectedUsers.filter((u) => u.id !== user.id));
    } else {
      onChange([...selectedUsers, user]);
    }
  };

  const showList = isOpen && debouncedQuery.length > 0;

  return (
    <Command
      shouldFilter={false}
      className="flex flex-col gap-2 relative"
      ref={containerRef}
    >
      <Command.Input
        value={query}
        onValueChange={(v) => {
          setQuery(sanitizeNumeric(v));
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        inputMode="numeric"
        placeholder="شماره تلفن را وارد کنید"
        className="w-full text-gray-100 border border-gray-50 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-10"
      />

      {showList && (
        <div className="absolute top-12 z-50 w-full">
          <Command.List
            className="max-h-42 overflow-y-auto flex flex-col border border-gray-50 rounded-lg gap-2 bg-white
              scrollbar-thin scrollbar-thumb-gray-50 scrollbar-track-transparent
              hover:scrollbar-thumb-gray-80 scrollbar-thumb-rounded-full"
          >
            {isFetching && (
              <Command.Loading className="text-sm text-gray-100 p-2">
                در حال جستجو...
              </Command.Loading>
            )}

            {!isFetching && results.length === 0 && (
              <Command.Empty className="text-sm text-gray-100 p-2">
                کاربری یافت نشد
              </Command.Empty>
            )}

            {results.map((user) => {
              const isSelected = selectedUsers.some((u) => u.id === user.id);
              return (
                <Command.Item
                  key={user.id}
                  value={String(user.id)}
                  onSelect={() => toggleUser(user)}
                  className={`flex items-center gap-2 p-2.5 m-2 border border-gray-50 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? "bg-green-20" : ""
                  }`}
                >
                  {isSelected ? (
                    <SVG name="tickIcon" />
                  ) : (
                    <SVG name="userIcon" />
                  )}
                  <span className="text-gray-100">{user.phoneNumber}</span>
                </Command.Item>
              );
            })}
          </Command.List>
        </div>
      )}
    </Command>
  );
};

export default UserSearch;
