import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScreenWrapper({ children }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inner}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    inner: {
        flex: 1,
        padding: spacing.md,
    },
});