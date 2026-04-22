import { apiService } from "src/core";
import type { LoginCredentials, User, UserRole } from "src/shared";

export const authService = {
  login: async (credentials: LoginCredentials) => {
    return apiService.post<{
      refresh_token: string;
      token: string;
      user: User;
      roles: UserRole[];
    }>("/auth/login", credentials);
  },

  getUserAuth: async () => {
    return apiService.get<User>("/auth/get-user");
  },
};
