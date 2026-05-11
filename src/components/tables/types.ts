import type { ReactNode } from "react";

export type SortOrder = "asc" | "desc";

export type ColumnAlign = "left" | "right" | "center";

export type Column<T> = {
  /** شناسه یکتای ستون */
  key: string;
  /** عنوان نمایش داده شده در هدر */
  title: ReactNode;
  /** اسم فیلد توی آبجکت داده */
  dataIndex?: keyof T;
  /** رندر سفارشی سلول */
  render?: (value: unknown, row: T, index: number) => ReactNode;
  /** عرض ستون */
  width?: string | number;
  /** ترازبندی محتوا */
  align?: ColumnAlign;
  /** قابلیت سورت */
  sortable?: boolean;
  /** کلاس css سفارشی */
  className?: string;
  /** مخفی کردن ستون */
  hidden?: boolean;
};

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
  /** تعریف ستون‌ها */
  columns: Column<T>[];
  /** داده‌ها */
  data: T[];
  /** کلید یکتای هر ردیف */
  rowKey: keyof T | ((row: T) => string | number);

  /** وضعیت لودینگ */
  loading?: boolean;
  /** متن یا کامپوننت حالت خالی */
  emptyText?: ReactNode;

  /** کلیک روی ردیف */
  onRowClick?: (row: T, index: number) => void;
  /** کلاس سفارشی برای هر ردیف */
  rowClassName?: (row: T, index: number) => string;

  /** صفحه‌بندی */
  pagination?: PaginationProps | false;

  /** سورت */
  sortBy?: SortState;
  onSortChange?: (sort: SortState) => void;

  /** ظاهر */
  striped?: boolean;
  bordered?: boolean;
  size?: "sm" | "md" | "lg";
  stickyHeader?: boolean;
  className?: string;
};