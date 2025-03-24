import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";

export const HeaderLeft = (props) => {
  const { goBack } = useNavigation();

  if (!props.canGoBack) {
    return null;
  }

  return (
    <View style={{ top: -8 }}>
      <IconButton
        icon="chevron-left"
        size={32}
        onPress={goBack}
        style={{
          padding: 0,
          margin: 0,
        }}
      />
    </View>
  );
};
