import { FC } from "react";
import { View } from "react-native";
import { Icon, Text } from "react-native-paper";

type Props = {
  message: string;
};

export const EmptyList: FC<Props> = ({ message }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: 32,
      }}
    >
      <Icon source="account-question-outline" size={128} />
      <Text variant="headlineMedium" style={{ textAlign: "center" }}>
        {message}
      </Text>
    </View>
  );
};
