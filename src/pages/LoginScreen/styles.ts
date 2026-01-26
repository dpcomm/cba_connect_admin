import { StyleSheet } from "react-native";
import { Color, Layout } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.spacing.l,
    justifyContent: "center",
    backgroundColor: Color.default.background,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "bold",
    color: Color.primary.main,
  },
  inputContainer: {
    marginBottom: Layout.spacing.l,
    gap: 11,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  divider: {
    height: 16,
    width: 0.5,
    backgroundColor: Color.text.main,
    marginHorizontal: 10,
  },
});
