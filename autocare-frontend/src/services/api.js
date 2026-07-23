import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach JWT token to protected requests only
api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        // Do NOT send token while logging in or registering
        const isAuthRequest =
            config.url?.startsWith("/auth/login") ||
            config.url?.startsWith("/auth/register");

        if (token && !isAuthRequest) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => Promise.reject(error)

);

// Automatically logout if token becomes invalid
api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }

);

export default api;