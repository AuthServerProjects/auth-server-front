import type { PaginationProps } from "./types";

const TablePagination = ({
  page,
  pageSize,
  total,
  onChange,
  showSizeChanger,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange,
}: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const getPages = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "...")[] = [1];
    if (page > 3) pages.push("...");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex items-center justify-between px-4 py-3 text-sm">
      <div className="text-gray-500">
        نمایش {from.toLocaleString("fa-IR")} تا {to.toLocaleString("fa-IR")} از{" "}
        {total.toLocaleString("fa-IR")}
      </div>

      <div className="flex items-center gap-2">
        {showSizeChanger && onPageSizeChange && (
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="border border-gray-50 rounded-lg px-2 py-1 text-sm"
          >
            {pageSizeOptions.map((s) => (
              <option key={s} value={s}>
                {s} ردیف
              </option>
            ))}
          </select>
        )}

        <button
          onClick={() => canPrev && onChange(page - 1)}
          disabled={!canPrev}
          className="px-2 py-1 rounded border border-gray-50 disabled:opacity-40 hover:bg-gray-50"
        >
          قبلی
        </button>

        {getPages().map((p, i) =>
          p === "..." ? (
            <span key={`dot-${i}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={[
                "min-w-[32px] px-2 py-1 rounded border",
                p === page
                  ? "bg-gray-100 text-white border-gray-100"
                  : "border-gray-50 hover:bg-gray-50",
              ].join(" ")}
            >
              {p.toLocaleString("fa-IR")}
            </button>
          ),
        )}

        <button
          onClick={() => canNext && onChange(page + 1)}
          disabled={!canNext}
          className="px-2 py-1 rounded border border-gray-50 hover:bg-gray-50"
        >
          بعدی
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
