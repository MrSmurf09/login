import { apiService } from "src/core";
import type { Clients } from "src/shared/types/admin.types";

const admin = "/administrador";
const users = "/users";

export const adminService = {
  getUsers: async (search = "", page = "", limit = 10) => {
    return apiService.get<Clients>(
      `${admin}${users}?filter=${search}&page=${page}&limit=${limit}`,
    );
  },
};
