import React, { FC } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  children: string;
  tintColor?: string;
};

export const HeaderTitle: FC<Props> = ({ children }) => {
  return (
    <View>
      <Text variant="titleLarge">{children}</Text>
    </View>
  );
};
