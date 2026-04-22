import { Navigate, Outlet } from "react-router-dom";
import { ROUTES, type UserRole } from "src/shared";
import { useAuthLoading, useHasRole, useIsAuthenticated } from "../store";

interface RoleBasedRouteProps {
  allowedRoles: UserRole[];
}

export const RoleBasedRoute = ({ allowedRoles }: RoleBasedRouteProps) => {
  const isLoading = useAuthLoading();
  const isAuthenticated = useIsAuthenticated();
  const hasRole = useHasRole(allowedRoles);
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  if (!hasRole) return <div>No tienes permisos suficientes</div>;
  return <Outlet />;
};
