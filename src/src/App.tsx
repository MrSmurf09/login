import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { TestRemote } from "./test";
import { AuthInitializer } from "./shared/components/AuthInitializer";
// import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { router } from "./core";
import { queryClient } from "./config";
import { ToastContainer } from "./shared/components";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer />
      <ToastContainer />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
