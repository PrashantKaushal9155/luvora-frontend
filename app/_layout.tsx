import { Stack } from "expo-router";
import { useAuthStore } from "../store/authStore";

export default function RootLayout() {
  const token = useAuthStore((state) => state.token);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!token ? (
        <Stack.Screen name="auth/login" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}