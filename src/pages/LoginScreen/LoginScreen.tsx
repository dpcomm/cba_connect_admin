import React, { useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { authApi } from "../../apis/authApi";
import { Button } from "../../components/button/Button";
import { RecbaLogo } from "../../components/RecbaLogo";
import { TextInput } from "../../components/text-input/TextInput";
import { ThemedText } from "../../components/themed-text/ThemedText";
import { Color, Layout } from "../../constants/theme";
import { useAuthStore } from "../../utils/authStore";
import { styles } from "./styles";

export default function LoginScreen() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogin = async () => {
    if (!userId || !password) {
      Alert.alert("오류", "아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      const user = await authApi.login({ userId, password });
      setUser(user);
    } catch (error: any) {
      Alert.alert(
        "로그인 실패",
        error.message || "로그인 중 오류가 발생했습니다.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.logoContainer}>
        <RecbaLogo width={210} height={49} />
        <ThemedText
          variant="text4"
          color={Color.text.sub}
          style={{ marginTop: 8 }}
        >
          관리자용 어플리케이션
        </ThemedText>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="아이디 입력"
          value={userId}
          onChangeText={setUserId}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="비밀번호 입력"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={{ marginTop: 20 }}>
          <Button
            title="로그인"
            onPress={handleLogin}
            disabled={loading}
            size="large"
          />
        </View>

        {loading && (
          <ActivityIndicator
            style={{ marginTop: Layout.spacing.s }}
            color={Color.primary.main}
          />
        )}
      </View>
    </View>
  );
}
