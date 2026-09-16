import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem("sitetrade_auth");
    const auth = raw ? JSON.parse(raw) : null;
    const token = auth?.token;

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // Ignore parse errors and continue unauthenticated.
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      error.friendlyMessage = "Network error — please check your connection and that the server is running.";
    } else {
      const status = error.response.status;
      const backendMessage = error.response.data?.message || error.response.data?.error;

      if (status === 400) {
        error.friendlyMessage = backendMessage || "Please check the information you entered.";
      } else if (status === 401) {
        error.friendlyMessage = "Please log in to continue.";
      } else if (status === 403) {
        error.friendlyMessage = "You don't have permission to do that.";
      } else if (status === 404) {
        error.friendlyMessage = backendMessage || "Not found.";
      } else {
        error.friendlyMessage = backendMessage || "Something went wrong. Please try again.";
      }
    }

    return Promise.reject(error);
  }
);

const unwrap = (response) => response?.data?.data ?? response?.data ?? null;

export const api = {
  get: async (url, config) => unwrap(await axiosInstance.get(url, config)),
  post: async (url, data, config) => unwrap(await axiosInstance.post(url, data, config)),
  put: async (url, data, config) => unwrap(await axiosInstance.put(url, data, config)),
  delete: async (url, config) => unwrap(await axiosInstance.delete(url, config)),
};

export default api;
