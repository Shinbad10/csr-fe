import axios from "axios";
import { apiUrl } from "./urlAPI";

export function createServerApi(cookie:any) {
  const accessToken = cookie.get("accessToken") || "";
  const refreshToken = cookie.get("refreshToken") || "";

  const api = axios.create({
    baseURL: apiUrl.base,
    timeout: 5000,
  });

  if (accessToken.value) {
    api.defaults.headers["Authorization"] = `Bearer ${accessToken.value}`;
    return api
  }
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Gọi API refresh token
          if (!refreshToken) {
            throw new Error("Refresh token is missing!");
          }

          const refreshResponse = await axios.post(
            `${apiUrl.base}${apiUrl.auth.refresh}`,
            { refreshToken:refreshToken.value }
          );

          const { accessToken: newAccessToken } = refreshResponse.data;

          // Gắn token mới vào headers
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(originalRequest); // Retry request với token mới
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
