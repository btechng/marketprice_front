import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://marketprice-tracker.onrender.com/api",
});

// Attach Authorization header automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  },
);

// Optional: Interceptor for responses to catch errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
