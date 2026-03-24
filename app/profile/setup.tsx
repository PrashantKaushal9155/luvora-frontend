import CustomButton from "@/components/ui/CustomButton";
import { useAuthStore } from "@/store/authStore";
import { Text, View } from "react-native";

export default function ProfileSetupScreen () {
    const setAuth = useAuthStore((state) => state.setAuth);
    const { accessToken, refreshToken } = useAuthStore();

    const completeProfile = () => {
        // temporary
        setAuth(accessToken!, refreshToken!, true);
    };

    return (
        <View>
            <Text>Complete your profile</Text>
            <CustomButton title="Complete" onPress={completeProfile} />
        </View>
    );
}