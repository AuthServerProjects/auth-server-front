import type { Column, SortState } from "./types";
import { getAlignClass, getSizeClass } from "./utils";

type TableHeaderProps<T> = {
  columns: Column<T>[];
  size?: "sm" | "md" | "lg";
  sortBy?: SortState;
  onSortChange?: (sort: SortState) => void;
  stickyHeader?: boolean;
  bordered?: boolean;
};

function TableHeader<T>({
  columns,
  size,
  sortBy,
  onSortChange,
  stickyHeader,
  bordered,
}: TableHeaderProps<T>) {
  const handleSort = (col: Column<T>) => {
    if (!col.sortable || !onSortChange) return;
    const nextOrder =
      sortBy?.key === col.key && sortBy.order === "asc" ? "desc" : "asc";
    onSortChange({ key: col.key, order: nextOrder });
  };

  return (
    <thead
      className={["text-black", stickyHeader ? "sticky top-0 z-10" : ""].join(
        " ",
      )}
    >
      <tr>
        {columns
          .filter((c) => !c.hidden)
          .map((col) => {
            const isSorted = sortBy?.key === col.key;
            return (
              <th
                key={col.key}
                style={{ width: col.width }}
                onClick={() => handleSort(col)}
                className={[
                  "font-semibold whitespace-nowrap",
                  getSizeClass(size),
                  getAlignClass(col.align),
                  bordered
                    ? "border border-gray-200"
                    : "border-b border-gray-50",
                  col.sortable ? "cursor-pointer select-none" : "",
                  col.className ?? "",
                ].join(" ")}
              >
                <span className="inline-flex items-center gap-1">
                  {col.title}
                  {col.sortable && (
                    <span className="text-xs opacity-60">
                      {isSorted ? (sortBy.order === "asc" ? "▲" : "▼") : "↕"}
                    </span>
                  )}
                </span>
              </th>
            );
          })}
      </tr>
    </thead>
  );
}

export default TableHeader;
