import type { TableProps } from "./types";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableEmpty from "./TableEmpty";
import TableLoading from "./TableLoading";
import TablePagination from "./TablePagination";

function Table<T>({
  columns,
  data,
  rowKey,
  loading = false,
  emptyText,
  onRowClick,
  rowClassName,
  pagination,
  sortBy,
  onSortChange,
  striped = false,
  bordered = false,
  size = "md",
  stickyHeader = false,
  className,
}: TableProps<T>) {
  const visibleColumns = columns.filter((c) => !c.hidden);
  const colSpan = visibleColumns.length;
  const isEmpty = !loading && data.length === 0;

  return (
    <div
      className={`w-full bg-white border border-gray-50 overflow-hidden rounded-b-lg ${className}`}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <TableHeader
            columns={columns}
            size={size}
            sortBy={sortBy}
            onSortChange={onSortChange}
            stickyHeader={stickyHeader}
            bordered={bordered}
          />

          {loading && <TableLoading colSpan={colSpan} />}

          {!loading && isEmpty && (
            <TableEmpty colSpan={colSpan} text={emptyText} />
          )}

          {!loading && !isEmpty && (
            <TableBody
              data={data}
              columns={columns}
              rowKey={rowKey}
              onRowClick={onRowClick}
              rowClassName={rowClassName}
              striped={striped}
              size={size}
              bordered={bordered}
            />
          )}
        </table>
      </div>

      {pagination && <TablePagination {...pagination} />}
    </div>
  );
}

export default Table;
