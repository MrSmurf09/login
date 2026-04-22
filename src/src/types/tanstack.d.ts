import type { ApiError } from "src/shared";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiError;
  }
}
