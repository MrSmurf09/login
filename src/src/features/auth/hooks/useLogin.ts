import { useMutation } from "@tanstack/react-query";
import { useAuthActions } from "src/core";
import { useEventDispatch } from "system_design/useEventBus";
import type { LoginCredentials } from "src/shared";
import { authService } from "../services";

export const useLogin = () => {
  const dispatch = useEventDispatch();
  const { setAuthSession } = useAuthActions();

  return useMutation({
    mutationFn: async (data: LoginCredentials) => {
      const response = await authService.login(data);
      if (!response.status) throw response.error;
      return response.data;
    },
    onSuccess: (data) => {
      if (data) {
        setAuthSession(data.user, data.token);
        console.log("send message to event bus");
        dispatch("mfe:login:success", { user: data.user, token: data.token });
      }
    },
  });
};
