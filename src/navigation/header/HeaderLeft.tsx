import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";

type Props = {
  canGoBack?: boolean;
  goBack?: () => void;
};

export const HeaderLeft: FC<Props> = (props) => {
  const { goBack } = useNavigation();

  if (!props.canGoBack) {
    return null;
  }

  return (
    <View style={{ top: 0 }}>
      <IconButton
        icon="chevron-left"
        size={32}
        onPress={props?.goBack || goBack}
        style={{
          padding: 0,
          margin: 0,
        }}
        rippleColor="transparent"
      />
    </View>
  );
};
