import React, { FC, useMemo } from "react";
import { Image, useWindowDimensions, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

type Props = {
  children: string;
  tintColor?: string;
  isLeftVisible?: boolean;
};

export const HeaderTitle: FC<Props> = ({ children, isLeftVisible }) => {
  const { width } = useWindowDimensions();
  const theme = useTheme();

  const calculatedWidth = useMemo(() => {
    if (isLeftVisible) {
      return width - 16 * 2 - 64;
    } else {
      return width - 16 * 2;
    }
  }, [width, isLeftVisible]);

  return (
    <View
      style={{
        borderColor: "red",
        borderWidth: 0,
        width: calculatedWidth,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      <View
        style={{
          borderColor: theme.colors.graySecondary,
          borderWidth: 1,
          borderRadius: 30,
          padding: 4,
        }}
      >
        <Image
          source={require("@assets/images/logo_icon.png")}
          style={{ width: 30, height: 30 }}
          resizeMode="contain"
        />
      </View>
      <Text variant="titleLarge">{children}</Text>
    </View>
  );
};
