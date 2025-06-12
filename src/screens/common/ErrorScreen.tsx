import { FC } from "react";
import { View } from "react-native";
import { Button, Icon, Text, useTheme } from "react-native-paper";

type Props = {
  onRetry: () => void;
};

export const ErrorScreen: FC<Props> = ({ onRetry }) => {
  const theme = useTheme();

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
      <Icon
        source="alert-decagram-outline"
        size={128}
        color={theme.colors.customError}
      />
      <Text variant="headlineMedium" style={{ textAlign: "center" }}>
        Wystąpił błąd podczas pobierania listy wynajmujących.
      </Text>
      <Button onPress={onRetry} textColor={theme.colors.customError}>
        Spróbuj ponownie
      </Button>
    </View>
  );
};
