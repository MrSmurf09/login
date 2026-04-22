import { useToastStore } from "src/core";
import Toast from "system_design/Toast";

export const ToastContainer = () => {
  const { open, message, severity, autoHideDuration, close } = useToastStore();

  return (
    <Toast
      open={open}
      message={message}
      severity={severity}
      autoHideDuration={autoHideDuration}
      onClose={close}
    />
  );
};
