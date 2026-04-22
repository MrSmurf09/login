import type { ToastSeverity } from "@bengali/shared-types";

interface ToastState {
  open: boolean;
  message: string;
  severity: ToastSeverity;
  autoHideDuration?: number;
}

export interface ToastStore extends ToastState {
  show: (
    message: string,
    severity: ToastSeverity,
    autoHideDuration?: number,
  ) => void;
  close: () => void;

  success: (message: string, autoHideDuration?: number) => void;
  error: (message: string, autoHideDuration?: number) => void;
  warning: (message: string, autoHideDuration?: number) => void;
  info: (message: string, autoHideDuration?: number) => void;
}
