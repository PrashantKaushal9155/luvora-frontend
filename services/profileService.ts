import { api } from "./api";

export const upsertProfile = async (data: any) => {
    return api.post("/profile/upsert", data);
};

export const uploadPhotos = async (formData: FormData) => {
    return api.post("/photos/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};