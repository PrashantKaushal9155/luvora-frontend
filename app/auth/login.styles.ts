import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        padding: spacing.lg,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    subtitle: {
        fontSize: 16,
        color: colors.textSecondary,
        marginBlock: spacing.lg,
    },
    footer: {
        marginTop: spacing.lg,
        textAlign: "center",
        color: colors.textSecondary,
    },
    link: {
        color: colors.primary,
        fontWeight: "600",
    },
});

export default styles;