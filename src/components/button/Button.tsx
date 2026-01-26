import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";
import { Font } from "../../constants/theme";
import { styles } from "./styles";

export interface ButtonProps {
  onPress?: () => void;
  title: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  style?: ViewStyle;
  textVariant?: keyof typeof Font;
}

export function Button({
  onPress,
  title,
  size = "medium",
  disabled = false,
  style,
  textVariant = "heading3",
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        disabled && styles.disabled,
        pressed && !disabled && styles.basePressed,
        style,
      ]}
    >
      <Text style={[styles.baseText, Font[textVariant]]}>{title}</Text>
    </Pressable>
  );
}
