export type ResponseDto<T> = {
  success: boolean;
  error: string | null;
  message: string;
  responses: T;
};

export type PageableRequest<T> = {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
  filters?: T;
};

export type PageableResponse<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};

export type BaseFilterDto = {
  isEnabled?: boolean;
};
