import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";

 
const logoSvg = require("../../assets/svgs/recba_logo.svg");

export const RecbaLogo = (props: { width?: number; height?: number }) => {
  const width = props.width || 210;
  const height = props.height || 49;

  return (
    <View
      style={{
        width,
        height,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={logoSvg}
        style={{
          width,
          height,
        }}
        contentFit="contain"
      />
    </View>
  );
};
