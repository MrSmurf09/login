import { AxiosError } from "axios";
import type { ApiResponse } from "src/shared";
import { apiClient } from "./axios.config";

const handleError = <T>(error: unknown): ApiResponse<T> => {
  if (error instanceof AxiosError) {
    return {
      status: false,
      error: {
        code: String(error.response?.data?.error?.status || "NETWORK_ERROR"),
        message: String(error.response?.data?.error?.message || "Sin conexión"),
        description: String(
          error.response?.data?.error?.description ||
            "Ocurrio un error inesperado.",
        ),
        type: "error",
      },
      data: null,
    };
  }
  return {
    status: false,
    error: {
      code: "UNKNOWN",
      message: "Error inesperado",
      description: "Error inesperado",
      type: "error",
    },
    data: null,
  };
};

export const apiService = {
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.get<ApiResponse<T>>(url);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  post: async <T, D = unknown>(
    url: string,
    data?: D,
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  postFile: async <T>(
    url: string,
    file: File,
    fileFieldName = "file",
    extraFields?: unknown,
  ): Promise<ApiResponse<T>> => {
    try {
      const formData = new FormData();
      formData.append(fileFieldName, file);
      if (extraFields) {
        Object.entries(extraFields).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }
      const response = await apiClient.post<ApiResponse<T>>(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  put: async <T, D = unknown>(
    url: string,
    data?: D,
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.put<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  patch: async <T, D = unknown>(
    url: string,
    data?: D,
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.patch<ApiResponse<T>>(url, data);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.delete<ApiResponse<T>>(url);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};
