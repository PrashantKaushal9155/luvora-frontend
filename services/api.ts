import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export const api = axios.create({
    baseURL: "https://localhost:7131/api",
});
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});