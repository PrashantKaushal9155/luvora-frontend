import colors from "@/constants/colors";
import typography from "@/constants/typography";
import { StyleSheet, Text } from "react-native";

export default function AppText({ children, style }: any) {
    return <Text style={[styles.text, style]}>{children}</Text>
}

const styles = StyleSheet.create({
    text: {
        color: colors.textPrimary,
        fontSize: typography.body,
    },
});