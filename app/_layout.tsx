import { Stack } from "expo-router";
import { useAuthStore } from "../store/authStore";

export default function RootLayout() {
  const { accessToken, profileCompleted } = useAuthStore();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!accessToken ? (
        <Stack.Screen name="auth/login" />
      ) : !profileCompleted ? (
        <Stack.Screen name="profile/setup" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}