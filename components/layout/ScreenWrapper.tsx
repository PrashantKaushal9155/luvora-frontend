import colors from "@/constants/colors";
import spacing from "@/constants/spacing";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ScreenWrapper({
    children,
    onBack,
    showBack = false,
}: any) {
    useEffect(() => {
        if (!onBack) return;

        const handleBackPress = () => {
            const result = onBack();

            // if onBack returns false → allow default (exit app)
            if (onBack === false) return false;

            return true; // prevent default
        };

        const sub = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackPress
        );

        return () => sub.remove();
    }, [onBack]);
    
    return (
                <SafeAreaView style={styles.container}>

                    {/* 🔙 Back Button */}
                    {showBack && onBack && (
                        <Ionicons
                        name="arrow-back"
                        size={24}
                        onPress={onBack}
                        style={styles.backIcon}
                        />
                    )}

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
    backIcon: {
        marginTop: spacing.md,
        marginLeft: spacing.md,
    },
});