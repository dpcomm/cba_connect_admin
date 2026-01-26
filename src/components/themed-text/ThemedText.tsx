import React from "react";
import { Text, type TextProps } from "react-native";
import { Font } from "../../constants/theme";
import { defaultColor, styles } from "./styles";

export type ThemedTextProps = TextProps & {
  variant?: keyof typeof Font;
  color?: string;
};

export function ThemedText({
  style,
  variant = "text2",
  color = defaultColor,
  ...rest
}: ThemedTextProps) {
  return <Text style={[styles[variant], { color }, style]} {...rest} />;
}
