import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Color, Layout } from "../constants/theme";
import { ThemedText } from "./themed-text/ThemedText";

interface AdminHeaderProps {
  userName?: string;
  onLogoutPress?: () => void;
}

export function AdminHeader({ userName, onLogoutPress }: AdminHeaderProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Layout.spacing.l,
        paddingTop: Layout.spacing.l,
        paddingBottom: Layout.spacing.m,
        backgroundColor: Color.default.background,
      }}
    >
      <View style={{ flex: 1 }}>
        <ThemedText variant="heading1" color={Color.primary.main}>
          CBA Admin
        </ThemedText>
        <ThemedText variant="text2" color={Color.text.main}>
          환영합니다,{" "}
          <ThemedText variant="text3" color={Color.text.main}>
            {userName}
          </ThemedText>
          님
        </ThemedText>
      </View>
      <TouchableOpacity
        onPress={onLogoutPress}
        style={{
          width: 44,
          height: 44,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Color.secondary.main,
          borderRadius: 22,
          ...Layout.shadow.default,
        }}
      >
        <Ionicons name="log-out-outline" size={24} color={Color.text.main} />
      </TouchableOpacity>
    </View>
  );
}
