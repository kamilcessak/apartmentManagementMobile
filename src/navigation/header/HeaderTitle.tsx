import React, { FC } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  children: string;
  tintColor?: string;
};

export const HeaderTitle: FC<Props> = ({ children }) => (
  <View>
    <Text variant="titleLarge">{children}</Text>
  </View>
);
