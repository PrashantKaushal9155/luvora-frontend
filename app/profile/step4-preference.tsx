import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import CustomButton from "@/components/ui/CustomButton";
import spacing from "@/constants/spacing";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Step4({ form, setForm, next, back }: any) {
    const [showError, setShowError] = useState(false);

    const isValid = form.preferredGender !== null;

    const handleContinue = () => {
        if (!isValid) {
            setShowError(true);
            return;
        }
        setShowError(false);
        next();
    };

    return (
        <ScreenWrapper onBack={back} showBack>
            <AppText>Step 4 of 8</AppText>

            <AppText style={{ fontSize: 24, marginTop: spacing.lg }}>
                Who are you interested in?
            </AppText>

            <View style={{ marginTop: spacing.lg}}>
                {["Male", "Female"].map((item, i) => {
                    const value = i + 1;
                    const selected = form.preferredGender === value;

                    return (
                        <TouchableOpacity
                            key={item}
                            style={[
                                styles.option,
                                selected && styles.selected
                            ]}
                            onPress={() => {
                                setForm({ ...form, preferredGender: value });
                                if (showError) setShowError(false);
                            }}
                            activeOpacity={0.7}
                        >
                            <AppText style={selected && styles.selectedText}>
                                {item}
                            </AppText>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Error */}
            {showError && (
                <AppText style={{ color: "red", marginTop: spacing.sm }}>
                    Please select your preference
                </AppText>
            )}

            <CustomButton
                title="Continue"
                onPress={handleContinue}
                disabled={!isValid}
                style={{ marginTop: spacing.lg }}
            />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    option: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        marginBottom: spacing.md,
    },
    selected: {
        borderColor: "#007bff",
        backgroundColor: "#e6f0ff",
    },
    selectedText: {
        color: "#007bff",
        fontWeight: "600",
    },
});