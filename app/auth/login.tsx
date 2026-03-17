import CustomButton from "@/components/ui/CustomButton";
import InputField from "@/components/ui/InputField";
import { login } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import styles from "./login.styles";

export default function LoginScreen() {
    const setToken = useAuthStore((state) => state.setToken);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await login(email, password);

            setToken(res.accessToken)
        } catch (error: any) {
            Alert.alert("Login failed", "Invalid credentials");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Luvora❤️</Text>
            <Text style={styles.subtitle}>Login to your account</Text>
            
            <InputField
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <InputField
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <CustomButton title="Login" onPress={handleLogin} />

            <Text style={styles.footer}>
                Don't have an account? <Text style={styles.link}>Sign up</Text>
            </Text>
        </View>
    );
}