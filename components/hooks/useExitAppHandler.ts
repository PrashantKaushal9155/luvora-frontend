import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { BackHandler } from "react-native";

const useExitAppHandler = (onBackPress: () => void) => {

    useFocusEffect(
        useCallback(() => {

            const handleBackPress = () => {
                onBackPress();
                return true;
            };

            const subscription = BackHandler.addEventListener(
                "hardwareBackPress",
                handleBackPress
            );

            return () => subscription.remove();

        }, [onBackPress])
    );
};

export default useExitAppHandler;