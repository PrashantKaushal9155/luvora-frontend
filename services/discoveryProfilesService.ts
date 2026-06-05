import { api } from "./api";

export const getDiscoveryProfiles = async () => {
    const response = await api.get("/api/discoverprofiles");
    return response.data;
}