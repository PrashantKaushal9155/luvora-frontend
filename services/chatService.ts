import { api } from "./api";

export const getMessages = async (matchId: string) => {
    const response = await api.get(`/api/chat/${matchId}`);
    return response.data;
};

export const markMessagesAsRead = async (matchId: string) => {
    await api.post(`/api/chat/mark-read/${matchId}`);
};