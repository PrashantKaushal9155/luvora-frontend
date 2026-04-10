import CustomButton from "@/components/ui/CustomButton";
import InputField from "@/components/ui/InputField";
import { login } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import styles from "./login.styles";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Too short")
        .required("Password is required"),
});

export default function LoginScreen() {
    const setAuth = useAuthStore((state) => state.setAuth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async (email: string, password: string) => {
        try {
            console.log("LoginClicked");
            const response = await login(email, password);

            if (!response || response.status !== 200) {
                Alert.alert("Server Error", "We're having trouble reaching the server. Please try again in a moment.");
                return;
            }

            if (!response.profileCompleted) {
                router.replace("/profile/setup");
            } else {
                router.replace("/(tabs)/discovery");
            }

            setAuth(response.accessToken, response.refreshToken, response.profileCompleted);
        } catch (error: any) {
            console.log("Login Failed", JSON.stringify(error?.response?.data || "Error"));
            if (error.response) {
                // Server responded with error (500, 404, etc.)
                Alert.alert("Server Issue","Something went wrong on our side. Please try again later.");
            } else if (error.request) {
                // No response received
                Alert.alert("Connection Problem", "Unable to reach the server. Check your internet connection.");
            } else {
                // Something else
                Alert.alert("Unexpected Error", "Something unexpected happened. Please try again.");
            }
        }
    };

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
                handleLogin(values.email, values.password);
            }}
        >
            {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
            }) => (
                <View style={styles.container}>
                    <Text style={styles.title}>Welcome to Luvora</Text>
                    <Text style={styles.subtitle}>Login to your account</Text>
                    
                    <InputField
                        placeholder="Email"
                        value={values.email}
                        onChangeText={handleChange("email")}
                    />
                    {touched.email && errors.email && (
                        <Text style={styles.error}>{errors.email}</Text>
                    )}

                    <View style={styles.passwordContainer}>
                        <InputField
                            placeholder="Password"
                            value={values.password}
                            onChangeText={handleChange("password")}
                            secureTextEntry={!showPassword}
                        />

                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                            name={showPassword ? "eye-off" : "eye"}
                            size={22}
                            color="#64748b"
                            />
                        </TouchableOpacity>
                    </View>

                    {touched.password && errors.password && (
                        <Text style={styles.error}>{errors.password}</Text>
                    )}

                    <CustomButton title="Login" onPress={handleSubmit as any} />

                    <Text style={styles.footer}>
                        Don't have an account? <Text style={styles.link}>Sign up</Text>
                    </Text>
                </View>
            )}
        </Formik>
    );
}