import { create } from "zustand";
import type { ToastStore } from "./toast.types";

export const useToastStore = create<ToastStore>((set) => ({
  open: false,
  message: "",
  severity: "info",
  autoHideDuration: 6000,

  show: (message, severity, autoHideDuration) =>
    set({ open: true, message, severity, autoHideDuration }),

  close: () => set({ open: false }),

  success: (msg, dur) =>
    set({
      open: true,
      message: msg,
      severity: "success",
      autoHideDuration: dur,
    }),
  error: (msg, dur) =>
    set({ open: true, message: msg, severity: "error", autoHideDuration: dur }),
  warning: (msg, dur) =>
    set({
      open: true,
      message: msg,
      severity: "warning",
      autoHideDuration: dur,
    }),
  info: (msg, dur) =>
    set({ open: true, message: msg, severity: "info", autoHideDuration: dur }),
}));
