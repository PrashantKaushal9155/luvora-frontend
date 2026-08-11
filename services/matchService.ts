import { api } from "./api";

export const getMatches = async () => {
    const response = await api.get("/api/matches");
    return response.data;
}