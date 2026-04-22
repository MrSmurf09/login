import { useQuery } from "@tanstack/react-query";
import { adminService } from "../services";

export const useListUsers = (search = "", page = "", limit = 10) => {
  return useQuery({
    queryKey: ["list-clients", { search, page, limit }],
    queryFn: async () => {
      const response = await adminService.getUsers(search, page, limit);
      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
