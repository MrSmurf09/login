import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuthActions } from "src/core";
import { authService } from "src/features/auth/services";
import { STORAGE_KEYS } from "../constants";
import { LocalStorageClient } from "../storage";

export const useGetAuthUser = () => {
  const { setAuthSession, logout } = useAuthActions();
  const token = LocalStorageClient.get<string>(STORAGE_KEYS.AUTH_TOKEN);

  const query = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const response = await authService.getUserAuth();
      if (!response.status) throw response.error;
      return response.data;
    },
    enabled: !!token,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.isSuccess && query.data && token) {
      setAuthSession(query.data, token);
    }
  }, [query.isSuccess, query.data, setAuthSession, token]);

  useEffect(() => {
    if (query.isError) {
      logout();
    }
  }, [query.isError, logout]);

  return query;
};
