import { StyleSheet } from "react-native";
import { Color, Font, Layout } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  middleContainer: {
    flexDirection: "row",
    height: 250,
  },
  focusedContainer: {
    width: 250,
  },
  cornerBorder: {
    flex: 1,
    borderWidth: 2,
    borderColor: Color.secondary.main,
    borderRadius: Layout.radius.l,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  resultContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: Layout.spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  resultContent: {
    alignItems: "center",
    width: "100%",
  },
  resultTitle: {
    ...Font.heading1,
    color: Color.text.white,
    marginTop: Layout.spacing.s,
    marginBottom: Layout.spacing.xs,
  },
  resultText: {
    ...Font.heading3,
    color: Color.text.white,
    marginBottom: Layout.spacing.s,
  },
  resultSubText: {
    ...Font.text2,
    color: "rgba(255,255,255,0.8)",
    marginBottom: Layout.spacing.xl,
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: Layout.radius.m,
    padding: Layout.spacing.m,
    marginBottom: Layout.spacing.xl,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: Layout.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  infoLabel: {
    ...Font.text2,
    color: "rgba(255,255,255,0.6)",
  },
  infoValue: {
    ...Font.text1,
    color: Color.text.white,
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    gap: Layout.spacing.s,
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: Color.secondary.main,
    paddingVertical: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.l,
    borderRadius: Layout.radius.l,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: Color.text.main,
    ...Font.text1,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    borderColor: Color.secondary.main,
  },
  secondaryButtonText: {
    color: Color.text.white,
  },
});
