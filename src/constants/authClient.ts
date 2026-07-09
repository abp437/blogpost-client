export const ACCESS_TOKEN_STORAGE_KEY = "token";

export const AUTH_HEADER_KEYS = {
  AUTHORIZATION: "Authorization",
  CLIENT_TYPE: "x-client-type",
  CLIENT_DEVICE: "x-client-device",
};

export const AUTH_REFRESH_ENDPOINT = "/auth/refresh-token";

export const AUTH_FREE_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
];

export const AUTH_FAILURE_REDIRECT_PATH = "/";
