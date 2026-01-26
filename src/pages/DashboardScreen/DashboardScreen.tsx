import { Ionicons } from "@expo/vector-icons";
import { useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { authApi } from "../../apis/authApi";
import { AdminHeader } from "../../components/AdminHeader";
import { Color } from "../../constants/theme";
import { useAuthStore } from "../../utils/authStore";
import { styles } from "./styles";

export default function DashboardScreen() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      logout();
    } catch {
      Alert.alert("Error", "Logout failed");
    }
  };

  const menuItems = [
    {
      title: "QR 체크인",
      description: "신청서 입장 확인",
      icon: "qr-code-outline",
      onPress: () => router.push("/scan"),
      color: Color.primary.main,
    },
    {
      title: "신청서 목록",
      description: "전체 인원 조회",
      icon: "people-outline",
      onPress: () => router.push("/check-in-list"),
      color: "#2196F3",
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AdminHeader userName={user?.name} onLogoutPress={handleLogout} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionTitle}>빠른 메뉴</Text>
        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuCard}
              onPress={item.onPress}
            >
              <Ionicons name={item.icon as any} size={40} color={item.color} />
              <Text style={styles.menuCardTitle}>{item.title}</Text>
              <Text style={styles.menuCardDesc}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
