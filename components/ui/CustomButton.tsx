import colors from "@/constants/colors";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CustomButton({ title, onPress, disabled }: any) {
    return (
        <TouchableOpacity 
            style={[
                styles.button,
                disabled && styles.buttonDisabled,
            ]} 
            onPress={!disabled ? onPress : onPress}
            activeOpacity={0.7}
        >
            <Text style={[
                    styles.text,
                    disabled && styles.textDisabled
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: "#a0c4ff",
    },
    text: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "600",
    },
    textDisabled: {
        color: colors.disabledColor,
    },
});