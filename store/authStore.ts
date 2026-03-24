import { create } from "zustand";

type AuthState = {
    accessToken: string | null;
    refreshToken: string | null;
    profileCompleted: boolean;

    setAuth: (
        accessToken: string,
        refreshToken: string,
        profileCompleted: boolean
    ) => void;

    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    refreshToken: null,
    profileCompleted: false,

    setAuth: (accessToken, refreshToken, profileCompleted) => 
        set({ accessToken, refreshToken, profileCompleted }),

    logout: () => 
        set({
            accessToken: null,
            refreshToken: null,
            profileCompleted: false,
        }),
}));