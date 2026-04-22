import type { Permission, User } from "src/shared";
import { UserRole } from "src/shared";
import { useAuthStore } from "./auth.store";

export const useAuthUser = (): User | null =>
	useAuthStore((state) => state.user);

export const useAuthToken = (): string | null =>
	useAuthStore((state) => state.token);

export const useIsAuthenticated = (): boolean =>
	useAuthStore((state) => state.isAuthenticated);

export const useAuthLoading = (): boolean =>
	useAuthStore((state) => state.isLoading);

export const useHasUser = (): boolean =>
	useAuthStore((state) => Boolean(state.user));

export const useAuthReady = (): boolean =>
	useAuthStore((state) => !state.isLoading && state.isAuthenticated);

export const useAuthRole = (): UserRole[] | undefined =>
	useAuthStore((state) => state.user?.roles);

export const useIsAdmin = (): boolean =>
	useAuthStore((state) => state.user?.roles?.includes(UserRole.ADMIN) ?? false);

export const useHasRole = (allowedRoles: UserRole[]): boolean =>
	useAuthStore((state) => {
		if (!state.user) return false;
		return allowedRoles.some((role) => state.user?.roles?.includes(role));
	});

export const useHasPermissions = (
	requiredPermissions: Permission[],
	requireAll: boolean = true,
): boolean =>
	useAuthStore((state) => {
		if (!state.user) return false;
		return requireAll
			? requiredPermissions.every((perm) =>
					state.user?.permissions.includes(perm),
				)
			: requiredPermissions.some((perm) =>
					state.user?.permissions.includes(perm),
				);
	});

export const isAuthenticated = (): boolean =>
	useAuthStore.getState().isAuthenticated;

export const getAuthToken = (): string | null => useAuthStore.getState().token;

export const getAuthUser = (): User | null => useAuthStore.getState().user;
