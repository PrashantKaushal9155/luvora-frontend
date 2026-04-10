import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import CustomButton from "@/components/ui/CustomButton";
import InputField from "@/components/ui/InputField";
import spacing from "@/constants/spacing";
import { upsertProfile } from "@/services/profileService";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Step8({ form, setForm, next, back }: any) {
    const BIO_LIMIT = 150;
    const [bio, setBio] = useState(form.bio || "");
    const [occupation, setOccupation] = useState(form.occupation || "");
    const [loading, setLoading] = useState(false);

    const handleBioChange = (text: string) => {
        if (text.length <= BIO_LIMIT) {
            setBio(text);
            setForm({ ...form, bio: text });
        }
    };

    const handleContinue = async () => {
        try {
            setLoading(true);
            // Prepare profile payload
            const payload = {
                name: form.name?.trim(),
                dateOfBirth:
                    form.dateOfBirth instanceof Date
                        ? form.dateOfBirth.toISOString()
                        : new Date(form.dateOfBirth).toISOString(),
                gender: form.gender,
                preferredGender: form.preferredGender,
                minPreferredAge: form.minPreferredAge,
                maxPreferredAge: form.maxPreferredAge,
                city: form.city,
                country: form.country || "India",
                bio: bio.trim() || null,
                occupation: occupation.trim() || null,
                relationshipStatus: 1,
            };

            // Save Profile
            console.log("payload: ", payload);
            const response = await upsertProfile(payload);

            console.log("Profile upsert successful", response.data);
            Alert.alert("Success", "Profile saved successfully");

            setLoading(false);
            // Navigate to app
            router.replace("/(tabs)/discovery");

        } catch (err) {
            setLoading(false);
            console.error("Profile creation failed", err);
            Alert.alert("Error", "Failed to save profile. Please try again.");
        }
    };

    const handleSkip = async () => {
        try {
            const payload = {
                name: form.name?.trim(),
                dateOfBirth:
                    form.dateOfBirth instanceof Date
                        ? form.dateOfBirth.toISOString()
                        : new Date(form.dateOfBirth).toISOString(),
                gender: form.gender,
                preferredGender: form.preferredGender,
                minPreferredAge: form.minPreferredAge,
                maxPreferredAge: form.maxPreferredAge,
                city: form.city,
                country: form.country || "India",
                bio: bio.trim() || null,
                occupation: occupation.trim() || null,
                relationshipStatus: 1,
            };

            // Save Profile
            console.log("payload: ", payload);
            const response = await upsertProfile(payload);

            console.log("Profile upsert successful", response.data);
            Alert.alert("Success", "Profile saved successfully");

            // Navigate to app
            router.replace("/(tabs)/discovery");

        } catch (err) {
            console.error("Profile creation failed", err);
            Alert.alert("Error", "Failed to save profile. Please try again.");
        }
    }

    return (
        <ScreenWrapper onBack={back} showBack>
            <AppText>Step 8 of 8</AppText>

            <AppText style={styles.title}>
                Tell us about yourself
            </AppText>

            {/* Bio */}
            <View style={{ marginTop: spacing.lg }}>
                <AppText>Bio</AppText>

                <InputField
                    placeholder="Write something about yourself..."
                    value={bio}
                    onChangeText={handleBioChange}
                    multiline
                    numberOfLines={4}
                    style={styles.bioInput}
                />

                {/* Character Counter */}
                <AppText style={styles.counter}>
                    {bio.length} / {BIO_LIMIT}
                </AppText>
            </View>

            {/* Occupation */}
            <View style={{ marginTop: spacing.lg }}>
                <AppText>Occupation</AppText>

                <InputField
                    placeholder="What do you do?"
                    value={occupation}
                    onChangeText={(text: string) => {
                        setOccupation(text);
                        setForm({ ...form, occupation: text });
                    }}
                />
            </View>

            {/* CTA */}
            <CustomButton
                title="Finish"
                onPress={handleContinue}
                style={{ marginTop: spacing.lg }}
            />
            
            {/*Skip Button */}
            <TouchableOpacity
                onPress={() => router.replace("/(tabs)/discovery")}
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
    bioInput: {
        height: 100,
        textAlignVertical: "top",
    },
    counter: {
        textAlign: "right",
        marginTop: 4,
        fontSize: 12,
        color: "#888",
    },
    skipText: {
        color: "#888",
        fontSize: 14,
        textDecorationLine: "underline", // optional
    },
});