import { StyleSheet } from "react-native";
import { Color, Font } from "../../constants/theme";

export const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.primary.main,
  },
  basePressed: {
    backgroundColor: Color.primary.pressed,
  },
  baseText: {
    ...Font.heading3, // This spreads the font object
    color: Color.text.white,
  },
  disabled: {
    backgroundColor: Color.text.disabled,
    opacity: 0.5,
  },

  small: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  medium: {
    paddingVertical: 6,
    paddingHorizontal: 36,
    borderRadius: 13,
  },
  large: {
    paddingVertical: 10,
    paddingHorizontal: 46,
    borderRadius: 15,
  },
});
