import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer } from "expo-audio";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { adminApi, ScanResultDto } from "../../apis/adminApi";
import { styles } from "./styles";

export default function QRScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResultDto | null>(null);
  const [status, setStatus] = useState<
    "IDLE" | "SUCCESS" | "WARNING" | "ERROR"
  >("IDLE");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const player = useAudioPlayer(require("../../../assets/sounds/beep.mp3"));
  const [scannedRetreatId, setScannedRetreatId] = useState<number | null>(null);

  const playBeep = async () => {
    try {
      // Seek to beginning to ensure it plays even if called rapidly
      player.seekTo(0);
      player.play();
    } catch (error) {
      console.log("Error playing sound", error);
    }
  };

  const triggerHaptic = async (isWarning: boolean = false) => {
    try {
      if (isWarning) {
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Warning,
        );
      } else {
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success,
        );
      }
    } catch (error) {
      console.log("Error triggering haptic", error);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginBottom: 20 }}>
          카메라 권한이 필요합니다.
        </Text>
        <Button onPress={requestPermission} title="권한 허용" />
      </View>
    );
  }

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (scanned || loading) return;
    setScanned(true);
    setLoading(true);

    try {
      const trimmedData = data.trim();
      console.log("Scanned data (trimmed):", trimmedData);

      // Expected format: retreat-checked-in:{retreatId}:{userId}
      if (!trimmedData.startsWith("retreat-checked-in:")) {
        console.warn("Invalid QR prefix:", trimmedData);
        throw new Error("유효하지 않은 QR 코드입니다.");
      }

      const parts = trimmedData.split(":");
      if (parts.length < 3) {
        throw new Error("잘못된 QR 형식입니다.");
      }

      const retreatId = parseInt(parts[1], 10);
      const userId = parts[2];

      if (isNaN(retreatId) || !userId) {
        throw new Error("QR 코드 데이터가 올바르지 않습니다.");
      }

      setScannedRetreatId(retreatId);

      // Play beep immediately after validation for responsiveness
      playBeep();

      const result = await adminApi.scanUser(userId, retreatId);
      setScanResult(result);

      // Trigger status-specific haptic after API result
      triggerHaptic(!result.feePaid);

      if (result.feePaid) {
        setStatus("SUCCESS");
        setMessage("회비 납부 완료");
      } else {
        setStatus("WARNING");
        setMessage("회비 미납");
      }
    } catch (error: any) {
      console.error(error);
      setStatus("ERROR");
      setMessage(error.message || "스캔 중 오류가 발생했습니다.");
      setScanResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!scanResult || !scannedRetreatId) return;

    setLoading(true);
    try {
      await adminApi.checkIn(scanResult.userId, scannedRetreatId);
      Alert.alert("성공", "체크인이 완료되었습니다.", [
        { text: "확인", onPress: resetScan },
      ]);
    } catch (error: any) {
      Alert.alert("오류", error.message || "체크인 처리에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const resetScan = () => {
    setScanned(false);
    setScanResult(null);
    setStatus("IDLE");
    setMessage("");
  };

  const getBackgroundColor = () => {
    switch (status) {
      case "SUCCESS":
        return "#4CAF50"; // Green
      case "WARNING":
        return "#FFC107"; // Yellow
      case "ERROR":
        return "#F44336"; // Red
      default:
        return "transparent";
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
      />

      {/* Overlay */}
      <View style={styles.overlay}>
        <View style={styles.unfocusedContainer}></View>
        <View style={styles.middleContainer}>
          <View style={styles.unfocusedContainer}></View>
          <View style={styles.focusedContainer}>
            {!scanned && <View style={styles.cornerBorder} />}
          </View>
          <View style={styles.unfocusedContainer}></View>
        </View>
        <View style={styles.unfocusedContainer}></View>
      </View>

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Ionicons name="close" size={30} color="white" />
      </TouchableOpacity>

      {/* Result Full Screen Overlay */}
      {scanned && (
        <View
          style={[
            styles.resultContainer,
            { backgroundColor: getBackgroundColor(), paddingTop: insets.top },
          ]}
        >
          {loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <>
              {status === "ERROR" ? (
                <View style={styles.resultContent}>
                  <Ionicons name="alert-circle" size={80} color="white" />
                  <Text style={styles.resultTitle}>스캔 오류</Text>
                  <Text style={styles.resultText}>{message}</Text>
                  <TouchableOpacity
                    style={[styles.button, { marginTop: 40 }]}
                    onPress={resetScan}
                  >
                    <Text style={styles.buttonText}>다시 스캔하기</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.resultContent}>
                  <Ionicons
                    name={status === "SUCCESS" ? "checkmark-circle" : "warning"}
                    size={80}
                    color="white"
                  />
                  <Text style={styles.resultTitle}>{scanResult?.name}</Text>
                  <Text style={styles.resultSubText}>
                    {status === "SUCCESS"
                      ? "회비 납부 확인됨"
                      : "회비 미납 상태"}
                  </Text>

                  {/* Detailed Info */}
                  <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>연락처</Text>
                      <Text style={styles.infoValue}>
                        {scanResult?.phone || "-"}
                      </Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>소속</Text>
                      <Text style={styles.infoValue}>
                        {scanResult?.group || "-"}
                      </Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Text style={styles.infoLabel}>체크인 상태</Text>
                      <Text style={styles.infoValue}>
                        {scanResult?.checkedInAt
                          ? `완료 (${new Date(
                              scanResult.checkedInAt,
                            ).toLocaleTimeString()})`
                          : "미체크인"}
                      </Text>
                    </View>
                    {scanResult?.notes ? (
                      <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                        <Text style={styles.infoLabel}>메모</Text>
                        <Text style={styles.infoValue}>{scanResult.notes}</Text>
                      </View>
                    ) : null}
                  </View>

                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[styles.button, styles.secondaryButton]}
                      onPress={resetScan}
                    >
                      <Text
                        style={[styles.buttonText, styles.secondaryButtonText]}
                      >
                        취소
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleCheckIn}
                    >
                      <Text style={styles.buttonText}>체크인 확정</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </>
          )}
        </View>
      )}
    </View>
  );
}
