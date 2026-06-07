import type { ReactNode } from "react";

export type SortOrder = "asc" | "desc";

export type ColumnAlign = "left" | "right" | "center";

/** ستونی که به یک فیلد از داده وصل است */
type DataColumn<T, K extends keyof T> = {
  key: string;
  title: ReactNode;
  dataIndex: K;
  render?: (value: T[K], row: T, index: number) => ReactNode;
  width?: string | number;
  align?: ColumnAlign;
  sortable?: boolean;
  className?: string;
  hidden?: boolean;
};

/** ستونی که فیلد داده ندارد (مثل ستون عملیات) */
type DisplayColumn<T> = {
  key: string;
  title: ReactNode;
  dataIndex?: undefined;
  render: (value: undefined, row: T, index: number) => ReactNode;
  width?: string | number;
  align?: ColumnAlign;
  sortable?: false;
  className?: string;
  hidden?: boolean;
};

/** ستون = یا به یک فیلد وصل است یا فقط نمایشی */
export type Column<T> =
  | { [K in keyof T]: DataColumn<T, K> }[keyof T]
  | DisplayColumn<T>;

export type SortState = {
  key: string;
  order: SortOrder;
};

export type PaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
};

export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey: keyof T | ((row: T) => string | number);

  loading?: boolean;
  emptyText?: ReactNode;

  onRowClick?: (row: T, index: number) => void;
  rowClassName?: (row: T, index: number) => string;

  pagination?: PaginationProps | false;

  sortBy?: SortState;
  onSortChange?: (sort: SortState) => void;

  striped?: boolean;
  bordered?: boolean;
  size?: "sm" | "md" | "lg";
  stickyHeader?: boolean;
  className?: string;
};
