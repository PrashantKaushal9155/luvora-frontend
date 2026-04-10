import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import CustomButton from "@/components/ui/CustomButton";
import PickerField from "@/components/ui/PickerField";
import spacing from "@/constants/spacing";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";

export default function Step2({ form, setForm, next, back }: any) {
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);

    const getAge = (dob: Date) => {
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    };

    const isValidDob = form.dateOfBirth && getAge(form.dateOfBirth) >= 18;

    const handleContinue = () => {
        if (!isValidDob) {
            setShowError(true);
            return;
        }
        setShowError(false);
        next();
    }

    // 🔹 Calculate default (18 years ago)
    const getDefaultDate = () => {
        const today = new Date();
        return new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate()
        );
    };

    const defaultDate = getDefaultDate();

    return (
        <ScreenWrapper onBack={back} showBack>
            <AppText>Step 2 of 8</AppText>

            <AppText style={{ fontSize: 24, marginTop: spacing.lg, marginBottom: spacing.lg }}>
                Your birth date?
            </AppText>

            <PickerField
                value={
                    form.dateOfBirth
                        ? form.dateOfBirth.toDateString()
                        : ""
                }
                placeholder="Select your birth date"
                onPress={() => setShow(true)}
            />

            {show && (
                <DateTimePicker
                    value={form.dateOfBirth || defaultDate }
                    mode="date"
                    maximumDate={new Date()}
                    onChange={(e, date) => {
                        setShow(false);
                        if (date) {
                            setForm({ ...form, dateOfBirth: date });
                            if (showError) setShowError(false);
                        }
                    }}
                />
            )}

            {/* Error */}
            {showError && (
                <AppText style={{ color: "red", marginTop: spacing.sm }}>
                    You must be at least 18 years old
                </AppText>
            )}

            <CustomButton 
                title="Continue" 
                onPress={handleContinue}
                disabled={!isValidDob}
            />
        </ScreenWrapper>
    );
}