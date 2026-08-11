import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export const api = axios.create({
    baseURL: "http://192.168.29.248:5220",
});
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});