import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";

export const HeaderLeft = () => {
  return (
    <View style={{ top: -8 }}>
      <IconButton
        icon="chevron-left"
        size={32}
        onPress={() => {}}
        style={{
          padding: 0,
          margin: 0,
        }}
      />
    </View>
  );
};
