import type { Column } from "./types";
import { getAlignClass, getCellValue, getSizeClass } from "./utils";

type TableCellProps<T> = {
  row: T;
  column: Column<T>;
  index: number;
  size?: "sm" | "md" | "lg";
  bordered?: boolean;
};

function TableCell<T>({ row, column, index, size, bordered }: TableCellProps<T>) {
  const value = getCellValue(row, column);
  const content = column.render
    ? column.render(value, row, index)
    : (value as React.ReactNode);

  return (
    <td
      className={[
        getSizeClass(size),
        getAlignClass(column.align),
        bordered ? "border border-gray-100" : "border-b border-gray-50",
        column.className ?? "",
      ].join(" ")}
    >
      {content ?? "-"}
    </td>
  );
}

export default TableCell;
