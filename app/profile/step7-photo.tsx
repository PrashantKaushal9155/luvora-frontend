import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import CustomButton from "@/components/ui/CustomButton";
import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import { uploadPhotos } from "@/services/profileService";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";

export default function Step7({ form, setForm, next, back }: any) {
    const [loading, setLoading] = useState(false);
    const photos = form.photos || [];

    // Add Photo
    const addPhoto = (uri: string) => {
        setForm({
            ...form,
            photos: [...photos, uri],
        });
    };

    // Camera
    const openCamera = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
            Alert.alert("Camera permission required");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
        });

        if (!result.canceled) {
            addPhoto(result.assets[0].uri);
        }
    };

    // Gallery
    const openGallery = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            Alert.alert("Permission required");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
        });

        if (!result.canceled) {
            addPhoto(result.assets[0].uri);
        }
    };

    // Picker Options
    const pickImage = async () => {
        if (photos.length >= 6) {
            Alert.alert("Limit reached", "You can upload max 6 photos");
            return;
        }

        Alert.alert("Upload Photo", "Choose an option", [
            { text: "Camera", onPress: openCamera },
            { text: "Gallery", onPress: openGallery },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    // Remove
    const removePhoto = (index: number) => {
        const updated = photos.filter((_: any, i: number) => i !== index);
        setForm({ ...form, photos: updated });
    };

    // Upload API
    const handleSubmit = async () => {
        if (photos.length === 0) return;

        try {
            setLoading(true);

            const formData = new FormData();

            photos.forEach((uri: string, index: number) => {
                formData.append("files", {
                    uri,
                    name: `photo_${index}.jpg`,
                    type: "image/jpeg",
                } as any);
            });

            const response = await uploadPhotos(formData);
            console.log("Profile upsert successful", response.data);
            Alert.alert("Success", "Profile saved successfully");

            setLoading(false);
            next();

        } catch (error) {
            setLoading(false);
            console.error(error);
            Alert.alert("Error", "Failed to upload photos");
        }
    };

    return (
        <ScreenWrapper onBack={back} showBack>
            <AppText>Step 7 of 8</AppText>

            <AppText style={styles.title}>
                Add your photos
            </AppText>

            <AppText style={styles.subtitle}>
                Upload up to 6 photos
            </AppText>

            {/* Grid */}
            <View style={styles.grid}>
                {photos.map((uri: string, index: number) => (
                    <View key={index} style={styles.imageWrapper}>
                        <Image source={{ uri }} style={styles.image} />

                        <TouchableOpacity
                            style={styles.removeBtn}
                            onPress={() => removePhoto(index)}
                        >
                            <Ionicons name="close" size={14} color="#fff" />
                        </TouchableOpacity>
                    </View>
                ))}

                {photos.length < 6 && (
                    <TouchableOpacity style={styles.addBox} onPress={pickImage}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="add" size={32} color="#aaa" />
                        </View>
                    </TouchableOpacity>
                )}
            </View>

            {/* Continue Button */}
            <CustomButton
                title={loading ? "Uploading..." : "Continue"}
                onPress={handleSubmit}
                disabled={photos.length === 0 || loading}
                style={{ marginTop: spacing.lg }}
            />

            {/* Skip Button */}
            <TouchableOpacity
                onPress={next}
                style={{ marginTop: spacing.md, alignItems: "center" }}
            >
                <AppText style={styles.skipText}>
                    Skip for now
                </AppText>
            </TouchableOpacity>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginTop: spacing.lg,
    },
    subtitle: {
        color: colors.textSecondary,
        marginBottom: spacing.lg,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.sm,
    },
    imageWrapper: {
        width: "30%",
        aspectRatio: 1,
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    removeBtn: {
        position: "absolute",
        top: 6,
        right: 6,
        backgroundColor: "rgba(0,0,0,0.7)",
        borderRadius: 14,
        padding: 4,
        elevation: 3, // Android
        shadowColor: "#000", // iOS
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    addBox: {
        width: "30%",
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: colors.textPrimary,
        borderStyle: "dashed",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    skipText: {
        color: "#888",
        fontSize: 16,
        textDecorationLine: "underline",
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1, // 🔥 ensures full box usage
    },
});