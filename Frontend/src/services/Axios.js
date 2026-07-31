import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (config.data && !(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (!error.response) {
      return Promise.reject(
        new Error("Network error. Please check your internet connection.")
      );
    }

    const isAuthRoute =
      error.config.url.includes("/auth/login") ||
      error.config.url.includes("/auth/signup");

    if (error.response.status === 401 && !isAuthRoute) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;