import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "./AppText";

export default function ExitModal({ visible, onCancel, onConfirm }: any) {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <AppText style={styles.title}>
                        Do you want to exit?
                    </AppText>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.noBtn} onPress={onCancel}>
                            <AppText style={styles.noText}>No</AppText>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.yesBtn} onPress={onConfirm}>
                            <AppText style={styles.yesText}>Yes</AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: spacing.md,
    },
    container: {
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: spacing.lg,
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        marginBottom: spacing.md,
    },
    actions: {
        flexDirection: "row",
        gap: spacing.md,
    },
    noBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
    },
    yesBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: colors.primary,
        alignItems: "center",
    },
    noText: {
        color: colors.textPrimary,
    },
    yesText: {
        color: colors.white,
    },
});