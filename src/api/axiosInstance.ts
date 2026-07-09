import axios from "axios";
import { getDeviceOperatingSystem, getWebClientPlatform } from "@utils";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  AUTH_FAILURE_REDIRECT_PATH,
  AUTH_FREE_ENDPOINTS,
  AUTH_HEADER_KEYS,
  AUTH_REFRESH_ENDPOINT,
} from "@/constants/authClient";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const CLIENT_TYPE = getWebClientPlatform();
const DEVICE = getDeviceOperatingSystem();

function getPathname(url = "") {
  if (!url) {
    return "";
  }

  try {
    return new URL(url).pathname;
  } catch {
    // Handles relative URLs like /auth/login
    return String(url).split("?")[0].split("#")[0];
  }
}

function isAuthFreeEndpoint(url = "") {
  const pathname = getPathname(url);

  return AUTH_FREE_ENDPOINTS.some(
    (endpoint) => pathname === endpoint || pathname.startsWith(`${endpoint}/`),
  );
}

// Add auth headers
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};

    config.headers[AUTH_HEADER_KEYS.CLIENT_TYPE] = CLIENT_TYPE;
    config.headers[AUTH_HEADER_KEYS.CLIENT_DEVICE] = DEVICE;

    const isAuthFree = isAuthFreeEndpoint(config.url);

    if (!isAuthFree) {
      const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

      if (token) {
        config.headers[AUTH_HEADER_KEYS.AUTHORIZATION] = `Bearer ${token}`;
      }
    } else {
      delete config.headers[AUTH_HEADER_KEYS.AUTHORIZATION];
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Handle expired access tokens
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const shouldRefresh =
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthFreeEndpoint(originalRequest.url);

    if (!shouldRefresh) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const response = await refreshClient.post(
        AUTH_REFRESH_ENDPOINT,
        {},
        {
          headers: {
            [AUTH_HEADER_KEYS.CLIENT_TYPE]: CLIENT_TYPE,
            [AUTH_HEADER_KEYS.CLIENT_DEVICE]: DEVICE,
          },
        },
      );

      const newAccessToken = response.data.accessToken;

      if (!newAccessToken) {
        throw new Error("Refresh token response missing access token");
      }

      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, newAccessToken);

      originalRequest.headers = originalRequest.headers || {};

      originalRequest.headers[AUTH_HEADER_KEYS.AUTHORIZATION] =
        `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshError: unknown) {
      console.error("Refresh token failed", refreshError);

      let status: number | undefined;

      if (axios.isAxiosError(refreshError)) {
        status = refreshError.response?.status;
      }

      if (status === 401 || status === 403) {
        localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
        window.location.assign(AUTH_FAILURE_REDIRECT_PATH);
      }

      return Promise.reject(refreshError);
    }
  },
);

export default axiosInstance;
