import React, { FC } from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";

type Props = {
  canGoBack?: boolean;
};

export const HeaderRight: FC<Props> = (props) => {
  if (!props?.canGoBack) {
    return null;
  }

  return (
    <View style={{ top: -8 }}>
      <IconButton icon="close" size={32} onPress={() => {}} />
    </View>
  );
};
