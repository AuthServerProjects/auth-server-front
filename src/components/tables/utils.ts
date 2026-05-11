import type { Column } from "./types";

/** گرفتن کلید یکتا برای هر ردیف */
export function getRowKey<T>(
  row: T,
  rowKey: keyof T | ((row: T) => string | number),
  index: number,
): string | number {
  if (typeof rowKey === "function") {
    return rowKey(row);
  }
  const value = row[rowKey];
  if (value === undefined || value === null) return index;
  return value as string | number;
}

/** گرفتن مقدار یک سلول از روی dataIndex */
export function getCellValue<T>(row: T, column: Column<T>): unknown {
  if (column.dataIndex === undefined) return undefined;
  return row[column.dataIndex];
}

/** کلاس‌بندی align */
export function getAlignClass(align?: "left" | "right" | "center"): string {
  switch (align) {
    case "center":
      return "text-center";
    case "left":
      return "text-left";
    case "right":
      return "text-right";
    default:
      return "";
  }
}

/** کلاس بر اساس سایز */
export function getSizeClass(size?: "sm" | "md" | "lg"): string {
  switch (size) {
    case "sm":
      return "py-1.5 px-2 text-xs";
    case "lg":
      return "py-4 px-5 text-base";
    case "md":
    default:
      return "py-3 px-4 text-sm";
  }
}
