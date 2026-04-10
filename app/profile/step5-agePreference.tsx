import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import CustomButton from "@/components/ui/CustomButton";
import spacing from "@/constants/spacing";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Step5({ form, setForm, next, back }: any) {
    const [showError, setShowError] = useState(false);

    const minAge = form.minPreferredAge ?? 18;
    const maxAge = form.maxPreferredAge ?? 30;

    const handleMinChange = (value: number) => {
        const newMin = Math.max(18, value);

        if (newMin > maxAge) {
            setForm({
                ...form,
                minPreferredAge: newMin,
                maxPreferredAge: newMin,
            });
        } else {
            setForm({
                ...form,
                minPreferredAge: newMin,
            });
        }

        if (showError) setShowError(false);
    };

    const handleMaxChange = (value: number) => {
        const newMax = Math.max(18, value);

        if (newMax < minAge) {
            setForm({
                ...form,
                minPreferredAge: newMax,
                maxPreferredAge: newMax,
            });
        } else {
            setForm({
                ...form,
                maxPreferredAge: newMax,
            });
        }

        if (showError) setShowError(false);
    };

    const isValid = minAge >= 18 && maxAge >= minAge;

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
            {/* Progress */}
            <AppText>Step 5 of 8</AppText>

            {/* Title */}
            <AppText style={styles.title}>
                Select Age Range
            </AppText>

            {/* Selected Range */}
            <AppText style={styles.rangeText}>
                {minAge} - {maxAge} years
            </AppText>

            {/* Min Slider */}
            <View style={styles.sliderContainer}>
                <AppText>Minimum Age</AppText>
                <Slider
                    minimumValue={18}
                    maximumValue={60}
                    step={1}
                    value={minAge}
                    onValueChange={handleMinChange}
                />
            </View>

            {/* Max Slider */}
            <View style={styles.sliderContainer}>
                <AppText>Maximum Age</AppText>
                <Slider
                    minimumValue={18}
                    maximumValue={60}
                    step={1}
                    value={maxAge}
                    onValueChange={handleMaxChange}
                />
            </View>

            {/* Error */}
            {showError && (
                <AppText style={{ color: "red", marginTop: spacing.sm }}>
                    Please select a valid age range
                </AppText>
            )}

            {/* Continue */}
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
    title: {
        fontSize: 24,
        marginTop: spacing.lg,
        marginBottom: spacing.md,
    },
    rangeText: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: spacing.lg,
    },
    sliderContainer: {
        marginVertical: spacing.md,
    },
});