import { Navigate, Outlet } from "react-router-dom";
import { ADMIN_ROUTES, ROUTES } from "src/shared";
import { useAuthLoading, useIsAdmin, useIsAuthenticated } from "../store";

export const PublicRoute = () => {
  const isLoading = useAuthLoading();
  const isAuthenticated = useIsAuthenticated();
  const isAdmin = useIsAdmin();
  if (isLoading) return <div>Loading...</div>;
  if (isAuthenticated)
    return (
      <Navigate
        to={`${isAdmin ? `${ROUTES.ADMIN}${ADMIN_ROUTES.USERS}` : ROUTES.LOGIN}`}
        replace
      />
    );
  return <Outlet />;
};
