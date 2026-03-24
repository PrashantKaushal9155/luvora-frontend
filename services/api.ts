import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export const api = axios.create({
    baseURL: "https://luvora-api.onrender.com/api",
});
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});