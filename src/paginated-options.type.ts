export type PaginatedOptions = {
  page?: number;
  pageSize?: number;
  filter?: any;
  sort?: any;
} & Record<string, any>;
