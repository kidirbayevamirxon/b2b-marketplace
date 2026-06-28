import axios from "axios";

const getApiBaseUrl = () => {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, "");
  }

  return "http://localhost:8000";
};

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["ngrok-skip-browser-warning"] = "true";

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("role");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);