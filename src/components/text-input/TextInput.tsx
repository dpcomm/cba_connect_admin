import React, { useState } from "react";
import {
    TextInput as RNTextInput,
    TextInputProps as RNTextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from "react-native";
import { Color } from "../../constants/theme";
import { styles } from "./styles";

export interface TextInputProps extends Omit<RNTextInputProps, "style"> {
  error?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export function TextInput({
  error = false,
  disabled = false,
  leftIcon,
  containerStyle,
  placeholderTextColor = Color.text.disabled,
  inputStyle,
  ...props
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.focused,
        error && styles.error,
        disabled && styles.disabled,
        containerStyle,
      ]}
    >
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      <RNTextInput
        style={[styles.input, inputStyle]}
        placeholderTextColor={placeholderTextColor}
        editable={!disabled}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
    </View>
  );
}
