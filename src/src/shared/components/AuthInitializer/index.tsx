import { useEffect } from "react";
import { useAuthActions } from "src/core";
import { useGetAuthUser } from "src/shared/hooks/useGetAuthUser";

export const AuthInitializer = () => {
  const { initializeAuth, setLoading } = useAuthActions();
  const { isLoading } = useGetAuthUser();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return null;
};
