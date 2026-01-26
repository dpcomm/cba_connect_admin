import { TextStyle } from "react-native";

// Utility for letter spacing
const letterSpacingFromPercent = (fontSize: number, percent: number) =>
  fontSize * (percent / 100);

export const Color = {
  primary: {
    main: "#6618A5",
    hover: "#C4ABDA",
    pressed: "#4E2372",
  },
  secondary: {
    main: "#FFFFFF",
    hover: "#E5E5E5",
    pressed: "#C4C4C4",
  },
  tertiary: {
    main: "#999999",
    hover: "#797979",
    pressed: "#474747",
  },
  text: {
    main: "#0F0F0F",
    sub: "#84888C",
    disabled: "#C0C3C5",
    white: "#FEFEFE",
  },
  default: {
    background: "#F8F8F8",
  },
  accents: {
    pink: "#FF2D55",
  },
};

export const Font = {
  heading1: {
    fontSize: 28,
    lineHeight: 38,
    letterSpacing: letterSpacingFromPercent(28, -2),
    fontWeight: "700" as TextStyle["fontWeight"], // Pretendard-Bold approximation
  },
  heading2: {
    fontSize: 24,
    lineHeight: 34,
    letterSpacing: letterSpacingFromPercent(24, -2),
    fontWeight: "600" as TextStyle["fontWeight"], // Pretendard-SemiBold approximation
  },
  heading3: {
    fontSize: 20,
    lineHeight: 30,
    letterSpacing: letterSpacingFromPercent(20, -2),
    fontWeight: "500" as TextStyle["fontWeight"], // Pretendard-Medium approximation
  },
  text1: {
    fontSize: 16,
    lineHeight: 29,
    letterSpacing: letterSpacingFromPercent(16, -2),
    fontWeight: "400" as TextStyle["fontWeight"], // Pretendard-Regular approximation
  },
  text2: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: letterSpacingFromPercent(14, -2),
    fontWeight: "400" as TextStyle["fontWeight"], // Pretendard-Regular approximation
  },
  text3: {
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: letterSpacingFromPercent(14, -2),
    fontWeight: "700" as TextStyle["fontWeight"], // Pretendard-Bold approximation
  },
  text4: {
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: letterSpacingFromPercent(12, -2),
    fontWeight: "400" as TextStyle["fontWeight"], // Pretendard-Regular approximation
  },
  text5: {
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: letterSpacingFromPercent(10, -2),
    fontWeight: "400" as TextStyle["fontWeight"], // Pretendard-Regular approximation
  },
  text6: {
    fontSize: 10,
    lineHeight: 18,
    letterSpacing: letterSpacingFromPercent(10, -2),
    fontWeight: "700" as TextStyle["fontWeight"], // Pretendard-Bold approximation
  },
};

export const Layout = {
  spacing: {
    xs: 4,
    s: 12,
    m: 18,
    l: 26,
    xl: 36,
    xxl: 48,
  },
  radius: {
    s: 10,
    m: 13,
    l: 15,
  },
  shadow: {
    default: {
      shadowColor: "#000",
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.15,
      shadowRadius: 5,
      elevation: 2,
    },
    drop: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
    },
  },
};
