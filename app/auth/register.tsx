import useExitAppHandler from "@/components/hooks/useExitAppHandler";
import CustomButton from "@/components/ui/CustomButton";
import ExitModal from "@/components/ui/ExitModal";
import InputField from "@/components/ui/InputField";
import { register } from "@/services/authService";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useState } from "react";
import { Alert, BackHandler, Text, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import styles from "./login.styles";

const RegisterSchema = Yup.object().shape ({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least 1 capital letter")
        .matches(/[a-z]/, "Password must contain at least 1 small letter"),
    
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Password must match"),
});

export default function Register () {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);
    
    useExitAppHandler(() => {
        setShowExitModal(true);
    });

    const handleRegister = async (
        email: string,
        password: string
    ) => {
        try {
            const response = await register(email, password);
            if (!response || response.status !== 200) {
                Alert.alert("Server Error", "We're having trouble reaching the server. Please try again in a moment.");
                return;
            }

            Alert.alert("Success", "Account created successfully");

            // After sign up send it to login page
            router.replace("/(tabs)/discovery");
        } catch(error: any) {
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
            initialValues={{ email: "", password: "", confirmPassword: ""}}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
                handleRegister(values.email, values.password);
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
                    <Text style={styles.title}>Join Luvora 💖</Text>
                    <Text style={styles.subtitle}>
                        Create your account and start matching
                    </Text>

                    {/* Email */}
                    <InputField
                        placeholder="Email"
                        value={values.email}
                        onChangeText={handleChange("email")}
                    />

                    {touched.email && errors.email && (
                        <Text style={styles.error}>{errors.email}</Text>
                    )}

                    <View style={styles.passwordContainer}>
                        {/* Password */}
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
                    <View style={styles.passwordContainer}>
                        {/* Confirm Password */}
                        <InputField
                            placeholder={"Confirm Password"}
                            value={values.confirmPassword}
                            onChangeText={handleChange("confirmPassword")}
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <Ionicons
                            name={showConfirmPassword ? "eye-off" : "eye"}
                            size={22}
                            color="#64748b"
                            />
                        </TouchableOpacity>
                    </View>
                    {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={styles.error}>{errors.confirmPassword}</Text>
                    )}

                    {/* CTA */}
                    <CustomButton title="Create Account" onPress={handleSubmit as any} />

                    {/* Footer */}
                    <TouchableOpacity onPress={() => router.replace("/auth/login")} >
                        <Text style={styles.footer}>
                            Already have an account?{" "}
                            <Text style={styles.link}>Login</Text>
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
    )
}