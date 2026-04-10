import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import CustomButton from "@/components/ui/CustomButton";
import ExitModal from "@/components/ui/ExitModal";
import InputField from "@/components/ui/InputField";
import spacing from "@/constants/spacing";
import { useState } from "react";
import { BackHandler } from "react-native";

export default function Step1({ form, setForm, next }: any) {
    const [showExitModal, setShowExitModal] = useState(false);
    const [showError, setShowError] = useState(false);

    const isValidName = form.name && form.name.trim().length >= 2;

    const handleContinue = () => {
        if( !isValidName) {
            setShowError(true);
            return;
        }
        setShowError(false);
        next();
    };

    return (
        <ScreenWrapper
            onBack={() => {
                setShowExitModal(true);
                return true;
            }}
        >
                {/* Progress */}
                <AppText>Step 1 of 8</AppText>

                {/* Question */}
                <AppText style={{ fontSize: 24, marginTop: spacing.lg, marginBottom: spacing.lg }}>
                    What's your name?
                </AppText>

                {/* Input */}
                <InputField
                    placeholder="Enter your name"
                    value={form.name}
                    autoFocus
                    returnKeytype="done"
                    onSubmitEditing={handleContinue}
                    onChangeText={(v: any) => {
                        setForm({ ...form, name: v });
                        if (showError) setShowError(false);
                    }}
                />

                {/* Error Message */}
                {showError && (
                    <AppText style={{ color: "red", marginTop: spacing.sm }}>
                        Please enter a valid name
                    </AppText>
                )}

                {/* CTA */}
                <CustomButton
                    title="Continue"
                    onPress={handleContinue}
                    disabled={!isValidName}
                    style={{ marginTop: spacing.lg }}
                />

                <ExitModal
                    visible={showExitModal}
                    onCancel={() => setShowExitModal(false)}
                    onConfirm={() => BackHandler.exitApp()} 
                />
        </ScreenWrapper>
    )
}