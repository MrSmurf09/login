export interface User {
  id: number;
  email: string;
  full_name: string;
  document: string;
  type_document: string;
  phone: string;
  address: string;
  accept_terms: boolean;
  roles: UserRole[];
  permissions: Permission[];
  created_at: string;
  credit_balance: number;
  avatar: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserCode {
  email: string;
  code: string;
}

export interface ApiError {
  code: string;
  message: string;
  description: string;
  type?: string;
}

type ApiFailure = {
  status: false;
  error: ApiError;
  data: null;
};

type ApiSuccess<T> = {
  status: true;
  error: null;
  data: T;
};

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  EDITOR = "EDITOR",
}

export enum Permission {
  READ = "READ",
  WRITE = "WRITE",
  DELETE = "DELETE",
  MANAGE_USERS = "MANAGE_USERS",
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
