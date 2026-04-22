export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
  KRUW_TERMS_ACCEPTED: "kruw_terms_accepted",
  THEME: "theme",
  LANGUAGE: "language",
  SHOW_TOUR: "tour",
} as const;

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL,
  TIMEOUT: 10000,
  EXPECTED_DURATION: 10,
  TOLERANCE_DURATION: 0.1,
  TOLERANCE_RADIO: 0.01,
  TARGET_RADIO: 3 / 4,
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/iniciar-sesion",
  NOT_FOUND: "/404",
  ADMIN: "/administrador",
} as const;

export const ADMIN_ROUTES = {
  USERS: "/users",
};
