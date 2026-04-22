import axios, { type AxiosError } from "axios";
import { queryClient } from "src/config";
import {
  API_CONFIG,
  LocalStorageClient,
  ROUTES,
  STORAGE_KEYS,
} from "src/shared";

export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = LocalStorageClient.get(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    if (Number(error.status) === 401) {
      queryClient.clear();
      LocalStorageClient.remove(STORAGE_KEYS.AUTH_TOKEN);
      window.location.replace(ROUTES.LOGIN);
    }
    return Promise.reject(error);
  },
);
