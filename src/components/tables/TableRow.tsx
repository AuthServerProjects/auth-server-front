import type { Column } from "./types";
import TableCell from "./TableCell";

type TableRowProps<T> = {
  row: T;
  index: number;
  columns: Column<T>[];
  onClick?: (row: T, index: number) => void;
  className?: string;
  striped?: boolean;
  size?: "sm" | "md" | "lg";
  bordered?: boolean;
};

function TableRow<T>({
  row,
  index,
  columns,
  onClick,
  className,
  size,
  bordered,
}: TableRowProps<T>) {
  return (
    <tr
      onClick={() => onClick?.(row, index)}
      className={[
        "transition-colors",
        "bg-white",
        onClick ? "cursor-pointer hover:bg-gray-30" : "hover:bg-gray-50",
        className ?? "",
      ].join(" ")}
    >
      {columns
        .filter((c) => !c.hidden)
        .map((col) => (
          <TableCell
            key={col.key}
            row={row}
            column={col}
            index={index}
            size={size}
            bordered={bordered}
          />
        ))}
    </tr>
  );
}

export default TableRow;
