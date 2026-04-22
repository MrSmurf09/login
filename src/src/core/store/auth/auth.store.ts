import type { User } from "src/shared";
import { LocalStorageClient, STORAGE_KEYS } from "src/shared";
import { create } from "zustand";
import type { AuthState } from "./auth.types";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: (user: User, token: string) => {
    LocalStorageClient.set(STORAGE_KEYS.AUTH_TOKEN, token);

    set({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  setAuthSession: (user: User, token: string) => {
    set({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  setUser: (user: User) => {
    set({
      user,
    });
  },

  logout: () => {
    LocalStorageClient.remove(STORAGE_KEYS.AUTH_TOKEN);
    LocalStorageClient.remove(STORAGE_KEYS.REFRESH_TOKEN);

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  initializeAuth: () => {
    const token = LocalStorageClient.get<string>(STORAGE_KEYS.AUTH_TOKEN);

    if (!token) {
      set({ isLoading: false });
      return;
    }

    set({
      token,
      isAuthenticated: true,
      isLoading: true,
    });
  },
}));
