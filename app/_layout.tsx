import { Slot, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { authApi } from "../src/apis/authApi";
import { useAuthStore } from "../src/utils/authStore";

export default function RootLayout() {
  const { isAuthenticated, setUser } = useAuthStore();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await SecureStore.getItemAsync("access_token");
        console.log("Checking login, token exists:", !!token);

        if (token) {
          // If token exists, try to fetch user.
          // The interceptor in client.ts should handle token refresh if needed.
          const user = await authApi.getMe();
          if (user && user.id) {
            console.log("User fetched successfully:", user.id);
            setUser(user);
          } else {
            console.log("Failed to fetch user data or invalid user object");
            await SecureStore.deleteItemAsync("access_token");
            await SecureStore.deleteItemAsync("refresh_token");
          }
        } else {
          console.log("No token found");
        }
      } catch (e) {
        // If this fails, it means even refresh failed or network error.
        // We stay logged out.
        console.log("Auto login failed:", e);
        // Optional: Clear tokens just in case
        await SecureStore.deleteItemAsync("access_token");
        await SecureStore.deleteItemAsync("refresh_token");
      } finally {
        setIsReady(true);
      }
    };
    checkLogin();
  }, [setUser]);

  useEffect(() => {
    if (isReady) {
      if (!isAuthenticated) {
        router.replace("/" as any);
      } else {
        router.replace("/dashboard");
      }
    }
  }, [isReady, isAuthenticated, router]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  );
}
