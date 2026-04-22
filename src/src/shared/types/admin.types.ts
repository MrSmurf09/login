import type { User } from "./auth.types";

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface Clients {
  users: User[];
  pagination: Pagination;
}
