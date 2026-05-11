import type { Column } from "./types";
import TableRow from "./TableRow";
import { getRowKey } from "./utils";

type TableBodyProps<T> = {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T | ((row: T) => string | number);
  onRowClick?: (row: T, index: number) => void;
  rowClassName?: (row: T, index: number) => string;
  striped?: boolean;
  size?: "sm" | "md" | "lg";
  bordered?: boolean;
};

function TableBody<T>({
  data,
  columns,
  rowKey,
  onRowClick,
  rowClassName,
  striped,
  size,
  bordered,
}: TableBodyProps<T>) {
  return (
    <tbody>
      {data.map((row, index) => (
        <TableRow
          key={getRowKey(row, rowKey, index)}
          row={row}
          index={index}
          columns={columns}
          onClick={onRowClick}
          className={rowClassName?.(row, index)}
          striped={striped}
          size={size}
          bordered={bordered}
        />
      ))}
    </tbody>
  );
}

export default TableBody;
