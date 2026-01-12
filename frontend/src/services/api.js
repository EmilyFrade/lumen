import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use(config => {
    if (!config.headers.Authorization) {
        const token = localStorage.getItem("auth");
        if (token) {
            config.headers.Authorization = `Basic ${token}`;
        }
    }

    return config;
});
