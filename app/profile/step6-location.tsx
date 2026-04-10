import ScreenWrapper from "@/components/layout/ScreenWrapper";
import AppText from "@/components/ui/AppText";
import CustomButton from "@/components/ui/CustomButton";
import InputField from "@/components/ui/InputField";
import PickerField from "@/components/ui/PickerField";
import spacing from "@/constants/spacing";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";


const countries = [
    "India",
];

const cities = [
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Bhopal",
    "Visakhapatnam",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Faridabad",
    "Meerut",
    "Rajkot",
    "Varanasi",
    "Srinagar",
    "Aurangabad",
    "Dhanbad",
    "Amritsar",
    "Allahabad",
    "Ranchi",
    "Coimbatore",
    "Jodhpur",
    "Madurai",
    "Raipur",
    "Kota",
    "Guwahati",
    "Chandigarh",
    "Thiruvananthapuram",
    "Other"
];

export default function Step6({ form, setForm, next, back }: any) {
    const [showError, setShowError] = useState(false);
    const [showCityDropdown, setShowCityDropdown] = useState(false);

    const isOtherCity = form.city === "Other";

    const isValid =
        (form.city && form.city !== "Other") ||
        (form.city && (!isOtherCity || form.customCity?.trim().length > 2));

    const handleContinue = async () => {
        if (!isValid) {
            setShowError(true);
            return;
        }
        
        const finalCity = isOtherCity ? form.customCity : form.city;

        setForm({
            ...form,
            city: finalCity,
            customCity: undefined,
            country: form.country || "India",
        })

        next(); 
    };

    return (
        <ScreenWrapper onBack={back} showBack>
            <AppText>Step 6 of 8</AppText>

            <AppText style={styles.title}>
                Where are you located?
            </AppText>

            <AppText>Country</AppText>
            <View style={styles.fixedField}>
                <AppText>India</AppText>
            </View>

            {/* City */}
            <AppText style={{ marginTop: spacing.lg }}>City</AppText>
            <PickerField
                value={form.city}
                placeholder="Select City"
                onPress={() => {
                    setShowCityDropdown(!showCityDropdown);
                }}
            />

            {showCityDropdown && (
                <ScrollView style={styles.dropdown}>
                    {cities.map((c) => (
                        <TouchableOpacity
                            key={c}
                            style={styles.option}
                            onPress={() => {
                                setForm({
                                    ...form,
                                    city: c,
                                    customCity: "",
                                });
                                setShowCityDropdown(false);
                                if (showError) setShowError(false);
                            }}
                        >
                            <AppText>{c}</AppText>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            {/* Custom City */}
            {isOtherCity && (
                <InputField
                    placeholder="Enter your city"
                    value={form.customCity}
                    onChangeText={(text: string) =>
                        setForm({ ...form, customCity: text })
                    }
                    style={{ marginTop: spacing.md }}
                />
            )}

            {/* Error */}
            {showError && (
                <AppText style={{ color: "red", marginTop: spacing.sm }}>
                    Please select your City
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
    option: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 6,
        marginTop: 5,
    },
    dropdown: {
        maxHeight: 200,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginTop: 5,
    },
    fixedField: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 12,
        marginTop: spacing.sm,
    },
});