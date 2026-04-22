import { useAuthStore } from "./auth.store";

export const useAuthActions = () => ({
  setAuth: useAuthStore((s) => s.setAuth),
  setAuthSession: useAuthStore((s) => s.setAuthSession),
  logout: useAuthStore((s) => s.logout),
  setLoading: useAuthStore((s) => s.setLoading),
  initializeAuth: useAuthStore((s) => s.initializeAuth),
  setUser: useAuthStore((s) => s.setUser),
});
