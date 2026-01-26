import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  adminApi,
  ApplicationFilterType,
  ApplicationListItem,
} from "../../apis/adminApi";
import { Color } from "../../constants/theme";
import { styles } from "./styles";

interface FilterTab {
  key: ApplicationFilterType;
  label: string;
}

const FILTER_TABS: FilterTab[] = [
  { key: "ALL", label: "전체" },
  { key: "NOT_CHECKED_IN", label: "미체크인" },
  { key: "FEE_UNPAID", label: "미납" },
  { key: "EVENT_WIN", label: "이벤트 당첨" },
];

export default function CheckInListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ApplicationFilterType>("ALL");
  const [items, setItems] = useState<ApplicationListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ApplicationListItem | null>(
    null,
  );
  const [checkingIn, setCheckingIn] = useState(false);
  const [retreatId, setRetreatId] = useState<number | null>(null);

  // Fetch system config to get current retreat ID
  useEffect(() => {
    const fetchSystemConfig = async () => {
      try {
        const config = await adminApi.getSystemConfig();
        setRetreatId(config.currentRetreatId);
        console.log("Current retreat ID:", config.currentRetreatId);
      } catch (error) {
        console.error("Failed to fetch system config:", error);
        Alert.alert("오류", "시스템 설정을 불러오는데 실패했습니다.");
      }
    };
    fetchSystemConfig();
  }, []);

  const fetchData = useCallback(async () => {
    if (!retreatId) return;

    try {
      console.log("Fetching data with:", { retreatId, search, filter });
      const result = await adminApi.getApplicationList(
        retreatId,
        search || undefined,
        filter,
      );
      console.log("Fetched result:", result);
      setItems(result?.items || []);
    } catch (error: any) {
      console.error("Failed to fetch applications:", error);
      console.error("Error details:", error.response?.data || error.message);
      Alert.alert("오류", "수련회 신청서 목록을 불러오는데 실패했습니다.");
      setItems([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [retreatId, search, filter]);

  useEffect(() => {
    setLoading(true);
    const debounce = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(debounce);
  }, [fetchData]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleCheckIn = async () => {
    if (!selectedItem || !retreatId) return;

    setCheckingIn(true);
    try {
      await adminApi.checkIn(selectedItem.userId, retreatId);
      Alert.alert("성공", "체크인이 완료되었습니다.");
      setSelectedItem(null);
      fetchData();
    } catch (error: any) {
      Alert.alert("오류", error.message || "체크인 처리에 실패했습니다.");
    } finally {
      setCheckingIn(false);
    }
  };

  const renderItem = ({ item }: { item: ApplicationListItem }) => {
    const isCheckedIn = !!item.checkedInAt;

    return (
      <TouchableOpacity
        style={styles.applicantCard}
        onPress={() => setSelectedItem(item)}
        activeOpacity={0.7}
      >
        <View style={styles.applicantHeader}>
          <Text style={styles.applicantName}>{item.name}</Text>
          <View style={styles.badgeContainer}>
            <View
              style={[
                styles.badge,
                item.feePaid ? styles.badgePaid : styles.badgeUnpaid,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  item.feePaid ? styles.badgeTextPaid : styles.badgeTextUnpaid,
                ]}
              >
                {item.feePaid ? "납부완료" : "미납"}
              </Text>
            </View>
            <View
              style={[
                styles.badge,
                isCheckedIn ? styles.badgeCheckedIn : styles.badgeNotCheckedIn,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  isCheckedIn
                    ? styles.badgeTextCheckedIn
                    : styles.badgeTextNotCheckedIn,
                ]}
              >
                {isCheckedIn ? "체크인" : "미체크인"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.applicantInfo}>
          <Ionicons name="call-outline" size={14} color={Color.text.sub} />
          <Text style={styles.applicantPhone}>{item.phone}</Text>
          {item.groupName && (
            <>
              <Text style={styles.applicantGroup}>•</Text>
              <Text style={styles.applicantGroup}>{item.groupName}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="people-outline" size={48} color={Color.text.sub} />
      <Text style={styles.emptyText}>
        {search ? "검색 결과가 없습니다" : "신청서가 없습니다"}
      </Text>
    </View>
  );

  const renderModal = () => {
    if (!selectedItem) return null;

    const isCheckedIn = !!selectedItem.checkedInAt;

    return (
      <Modal
        visible={!!selectedItem}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedItem(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedItem(null)}
        >
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.modalTitle}>{selectedItem.name}</Text>

            <View style={styles.modalInfo}>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalLabel}>연락처</Text>
                <Text style={styles.modalValue}>{selectedItem.phone}</Text>
              </View>
              {selectedItem.groupName && (
                <View style={styles.modalInfoRow}>
                  <Text style={styles.modalLabel}>소속</Text>
                  <Text style={styles.modalValue}>
                    {selectedItem.groupName}
                  </Text>
                </View>
              )}
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalLabel}>회비</Text>
                <Text
                  style={[
                    styles.modalValue,
                    {
                      color: selectedItem.feePaid ? "#4CAF50" : "#F44336",
                    },
                  ]}
                >
                  {selectedItem.feePaid ? "납부완료" : "미납"}
                </Text>
              </View>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalLabel}>체크인</Text>
                <Text
                  style={[
                    styles.modalValue,
                    {
                      color: isCheckedIn ? "#2196F3" : "#FF9800",
                    },
                  ]}
                >
                  {isCheckedIn
                    ? new Date(selectedItem.checkedInAt!).toLocaleString(
                        "ko-KR",
                      )
                    : "미체크인"}
                </Text>
              </View>
              {selectedItem.notes && (
                <View style={styles.modalInfoRow}>
                  <Text style={styles.modalLabel}>메모</Text>
                  <Text style={styles.modalValue}>{selectedItem.notes}</Text>
                </View>
              )}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setSelectedItem(null)}
              >
                <Text
                  style={[styles.modalButtonText, styles.modalButtonTextCancel]}
                >
                  닫기
                </Text>
              </TouchableOpacity>
              {!isCheckedIn && (
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.modalButtonConfirm,
                    checkingIn && styles.modalButtonDisabled,
                  ]}
                  onPress={handleCheckIn}
                  disabled={checkingIn}
                >
                  {checkingIn ? (
                    <ActivityIndicator color={Color.text.white} size="small" />
                  ) : (
                    <Text
                      style={[
                        styles.modalButtonText,
                        styles.modalButtonTextConfirm,
                      ]}
                    >
                      체크인
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Color.text.main} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>신청서 목록</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Ionicons
            name="search"
            size={20}
            color={Color.text.sub}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="이름 또는 전화번호 검색"
            placeholderTextColor={Color.text.disabled}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearch("")}
            >
              <Ionicons name="close-circle" size={20} color={Color.text.sub} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {FILTER_TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.filterTab,
              filter === tab.key && styles.filterTabActive,
            ]}
            onPress={() => {
              // Clear previous items and show loading immediately to avoid stale display
              setFilter(tab.key);
              setLoading(true);
              setItems([]);
            }}
          >
            <Text
              style={[
                styles.filterTabText,
                filter === tab.key && styles.filterTabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Color.primary.main} />
        </View>
      ) : (
        <FlatList
          style={styles.listContainer}
          contentContainerStyle={styles.listContent}
          data={items}
          keyExtractor={(item) => item.userId}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={Color.primary.main}
            />
          }
        />
      )}

      {/* Modal */}
      {renderModal()}
    </View>
  );
}
