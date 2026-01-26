import { StyleSheet } from "react-native";
import { Color, Font, Layout } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    paddingHorizontal: Layout.spacing.m,
    backgroundColor: Color.secondary.main,
    borderWidth: 1,
    borderColor: Color.secondary.pressed,
    borderRadius: Layout.radius.s,
  },

  input: {
    flex: 1,
    height: "100%",
    ...Font.text1,
    lineHeight: 22,
    color: Color.text.main,
    textAlignVertical: "center",
    paddingVertical: 0,
    includeFontPadding: false,
  },

  // Focus state
  focused: {
    borderColor: Color.primary.main,
  },

  // Error state
  error: {
    borderColor: "#E53E3E",
  },

  // Disabled state
  disabled: {
    backgroundColor: Color.default.background,
    opacity: 0.6,
  },

  // Icon
  leftIcon: {
    marginRight: Layout.spacing.s,
  },
});
