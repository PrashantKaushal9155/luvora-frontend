import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import CustomButton from "@/components/ui/CustomButton";
import spacing from "@/constants/spacing";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Step3({ form, setForm, next, back }: any) {
    const [showError, setShowError] = useState(false);

    const isValid = form.gender !== null;

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
            <AppText>Step 3 of 8</AppText>

            <AppText style={{fontSize: 24, marginTop: spacing.lg }}>
                Select your gender
            </AppText>

            <View style={{ marginTop: spacing.lg}}>
                {["Male", "Female"].map((g, i) => {
                    const value = i + 1;
                    const selected = form.gender === value;
                    
                    return (
                        <TouchableOpacity
                            key={g}
                            style={[
                                styles.option,
                                selected && styles.selected
                            ]}
                            onPress={() => {
                                setForm({ ...form, gender: value });
                                if (showError) setShowError(false);
                            }}
                            activeOpacity={0.7}
                        >
                            <AppText style={selected && styles.selectedText}>
                                {g}
                            </AppText>
                        </TouchableOpacity>
                )})}
            </View>

            {/* Error */}
            {showError && (
                <AppText style={{ color: "red", marginTop: spacing.sm }}>
                    Please select your gender
                </AppText>
            )}

            <CustomButton 
                title="Continue"
                onPress={handleContinue}
                disabled={!isValid}
                style={{ marginTop: spacing.lg }}
            />
        </ScreenWrapper>
    )
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