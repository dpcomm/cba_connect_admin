import { StyleSheet } from "react-native";
import { Color, Font, Layout } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.default.background,
  },
  contentContainer: {
    padding: Layout.spacing.l,
    gap: Layout.spacing.m,
  },
  sectionTitle: {
    ...Font.heading3,
    color: Color.text.main,
    marginBottom: Layout.spacing.s,
  },
  menuGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Layout.spacing.m,
  },
  menuCard: {
    flex: 1, // Take equal space in the row
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.l,
    padding: Layout.spacing.l,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1.1, // Slightly wider than square
    ...Layout.shadow.default,
  },
  menuCardTitle: {
    ...Font.heading3,
    color: Color.text.main,
    marginTop: Layout.spacing.m,
    textAlign: "center",
  },
  menuCardDesc: {
    ...Font.text2,
    color: Color.text.sub,
    marginTop: Layout.spacing.xs,
    textAlign: "center",
  },
});
