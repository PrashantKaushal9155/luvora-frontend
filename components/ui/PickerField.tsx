import spacing from "@/constants/spacing";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function PickerField({
    value,
    placeholder,
    onPress,
    style,
}: any) {
    const isEmpty = !value;

    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[styles.text, isEmpty && styles.placeholder]}>
                {isEmpty ? placeholder : value}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 12,
        justifyContent: "center",
        marginBottom: spacing.md,
    },
    text: {
        fontSize: 16,
        color: "#000",
    },
    placeholder: {
        color: "#999",
    },
});