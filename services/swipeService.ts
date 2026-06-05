import { api } from "./api";

export const swipeProfile = async (
    targetUserId: string,
    actionType: number
) => {
    const response = await api.post("/api/swipe", {
        targetUserId,
        actionType,
    });

    return response.data;
}