import { View } from "react-native";
import { Text } from "react-native-paper";

import { useAppContext } from "@contexts/AppContext";
import { useAppTheme } from "@hooks/useAppTheme";

export const OfflineView = () => {
  const { bottomTabHeight } = useAppContext();
  const theme = useAppTheme();

  return (
    <View
      style={{
        position: "absolute",
        bottom: bottomTabHeight,
        left: 0,
        backgroundColor: theme.colors.customError,
        padding: 16,
        width: "100%",
      }}
    >
      <Text
        variant="titleSmall"
        style={{ color: theme.colors.customBackground }}
      >
        Brak połączenia z internetem. Dane mogą być nieaktualne.
      </Text>
    </View>
  );
};
