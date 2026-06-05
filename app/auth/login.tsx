import useExitAppHandler from "@/components/hooks/useExitAppHandler";
import CustomButton from "@/components/ui/CustomButton";
import ExitModal from "@/components/ui/ExitModal";
import InputField from "@/components/ui/InputField";
import { login } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { Alert, BackHandler, Text, TouchableOpacity, View } from "react-native";
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

    const [showPassword, setShowPassword] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);
    const router = useRouter();

    useExitAppHandler(() => {
        setShowExitModal(true);
    });

    const handleLogin = async (email: string, password: string) => {
        try {
            console.log("LoginClicked");
            const response = await login(email, password);

            if (!response.profileCompleted) {
                router.replace("/profile/setup");
            } else {
                router.replace("/(tabs)/discovery");
            }

            setAuth(response.accessToken, response.refreshToken, response.profileCompleted);
        } catch (error: any) {
            console.log("Login Failed", JSON.stringify(error?.response?.data || "Error"));
            console.log("FULL ERROR:", error);
            console.log("ERROR MESSAGE:", error.message);
            console.log("ERROR RESPONSE:", error.response);
            console.log("ERROR REQUEST:", error.request);
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

                    <TouchableOpacity onPress={() => router.push("/auth/register")}>
                        <Text style={styles.footer}>
                            Don't have an account? <Text style={styles.link}>Sign up</Text>
                        </Text>
                    </TouchableOpacity>

                    <ExitModal
                        visible={showExitModal}
                        onCancel={() => setShowExitModal(false)}
                        onConfirm={() => { 
                            setShowExitModal(false);

                            setTimeout(() => {
                                BackHandler.exitApp();
                            }, 100);
                        }}
                    />
                </View>
            )}
        </Formik>
    );
}