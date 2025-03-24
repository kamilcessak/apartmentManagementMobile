import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { Text, View } from "react-native";

import { HeaderTitle } from "@navigation/header";

export const SettingsScreen = () => {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      let parent = navigation;
      while (parent && parent.getParent) {
        const newParent = parent.getParent();
        if (!newParent) break;
        parent = newParent;
      }

      if (parent) {
        parent.setOptions({
          headerTitle: () => <HeaderTitle children="Ustawienia" />,
        });
      }
    }, [])
  );

  return (
    <View>
      <Text>Ustawienia</Text>
    </View>
  );
};
