import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthWrapper } from "src/features/auth/components/AuthWrapper";
import { ADMIN_ROUTES, LazyWrapper, ROUTES, UserRole } from "src/shared";
import { PublicRoute, RoleBasedRoute, RootGuard } from "../guards";
import { AdminWrapper } from "src/features/admin";

const LoginPage = lazy(() =>
  import("src/features").then((m) => ({ default: m.LoginPage })),
);

const ListUsersPage = lazy(() =>
  import("src/features").then((m) => ({ default: m.ListUsersPage })),
);

export const router = createBrowserRouter([
  {
    element: (
      <LazyWrapper>
        <RootGuard />
      </LazyWrapper>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.LOGIN} replace />,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <div>Not found</div>,
      },
      {
        path: "*",
        element: <div>Not found</div>,
      },
      {
        element: (
          <AuthWrapper>
            <PublicRoute />
          </AuthWrapper>
        ),
        children: [
          {
            path: ROUTES.LOGIN,
            element: <LoginPage />,
          },
        ],
      },
      {
        path: ROUTES.ADMIN,
        element: (
          <LazyWrapper>
            <AdminWrapper>
              <RoleBasedRoute allowedRoles={[UserRole.ADMIN]} />
            </AdminWrapper>
          </LazyWrapper>
        ),
        children: [
          {
            index: true,
            path: ROUTES.ADMIN,
            element: <Navigate to={`${ROUTES.ADMIN}${ADMIN_ROUTES.USERS}`} />,
          },
          {
            path: `${ROUTES.ADMIN}${ADMIN_ROUTES.USERS}`,
            element: <ListUsersPage />,
          },
        ],
      },
    ],
  },
]);
