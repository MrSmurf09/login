import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 10 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
    },
    mutations: {
      retry: 0,
      onError: (error) => {
        toast.error(error.description || "Ocurrio un error inesperado", {
          id: "error_message",
        });
      },
    },
  },
});
