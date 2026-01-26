import { StyleSheet } from "react-native";
import { Color, Font, Layout } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.default.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: Layout.spacing.m,
    backgroundColor: Color.secondary.main,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  backButton: {
    marginRight: Layout.spacing.s,
  },
  headerTitle: {
    ...Font.heading3,
    color: Color.text.main,
  },
  searchContainer: {
    padding: Layout.spacing.m,
    backgroundColor: Color.secondary.main,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.default.background,
    borderRadius: Layout.radius.m,
    paddingHorizontal: Layout.spacing.s,
    height: 44,
  },
  searchIcon: {
    marginRight: Layout.spacing.xs,
  },
  searchInput: {
    flex: 1,
    ...Font.text1,
    color: Color.text.main,
    paddingVertical: 0,
  },
  clearButton: {
    padding: Layout.spacing.xs,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    backgroundColor: Color.secondary.main,
    gap: Layout.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  filterTab: {
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.radius.m,
    backgroundColor: Color.default.background,
  },
  filterTabActive: {
    backgroundColor: Color.primary.main,
  },
  filterTabText: {
    ...Font.text2,
    color: Color.text.sub,
  },
  filterTabTextActive: {
    color: Color.text.white,
    fontWeight: "600",
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: Layout.spacing.m,
    gap: Layout.spacing.s,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Layout.spacing.xxl,
  },
  emptyText: {
    ...Font.text1,
    color: Color.text.sub,
    marginTop: Layout.spacing.m,
  },
  applicantCard: {
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.l,
    padding: Layout.spacing.m,
    ...Layout.shadow.default,
  },
  applicantHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Layout.spacing.s,
  },
  applicantName: {
    ...Font.heading3,
    color: Color.text.main,
  },
  badgeContainer: {
    flexDirection: "row",
    gap: Layout.spacing.xs,
  },
  badge: {
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.radius.s,
  },
  badgePaid: {
    backgroundColor: "#E8F5E9",
  },
  badgeUnpaid: {
    backgroundColor: "#FFEBEE",
  },
  badgeCheckedIn: {
    backgroundColor: "#E3F2FD",
  },
  badgeNotCheckedIn: {
    backgroundColor: "#FFF3E0",
  },
  badgeText: {
    ...Font.text4,
    fontWeight: "600",
  },
  badgeTextPaid: {
    color: "#4CAF50",
  },
  badgeTextUnpaid: {
    color: "#F44336",
  },
  badgeTextCheckedIn: {
    color: "#2196F3",
  },
  badgeTextNotCheckedIn: {
    color: "#FF9800",
  },
  applicantInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Layout.spacing.xs,
  },
  applicantPhone: {
    ...Font.text2,
    color: Color.text.sub,
  },
  applicantGroup: {
    ...Font.text2,
    color: Color.text.sub,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: Layout.spacing.l,
  },
  modalContent: {
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.l,
    padding: Layout.spacing.l,
    width: "100%",
    maxWidth: 400,
    ...Layout.shadow.drop,
  },
  modalTitle: {
    ...Font.heading2,
    color: Color.text.main,
    textAlign: "center",
    marginBottom: Layout.spacing.m,
  },
  modalInfo: {
    gap: Layout.spacing.s,
    marginBottom: Layout.spacing.l,
  },
  modalInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalLabel: {
    ...Font.text2,
    color: Color.text.sub,
  },
  modalValue: {
    ...Font.text1,
    color: Color.text.main,
    fontWeight: "500",
  },
  modalButtons: {
    flexDirection: "row",
    gap: Layout.spacing.s,
  },
  modalButton: {
    flex: 1,
    paddingVertical: Layout.spacing.m,
    borderRadius: Layout.radius.m,
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: Color.default.background,
  },
  modalButtonConfirm: {
    backgroundColor: Color.primary.main,
  },
  modalButtonDisabled: {
    backgroundColor: Color.tertiary.main,
  },
  modalButtonText: {
    ...Font.text1,
    fontWeight: "600",
  },
  modalButtonTextCancel: {
    color: Color.text.main,
  },
  modalButtonTextConfirm: {
    color: Color.text.white,
  },
});
