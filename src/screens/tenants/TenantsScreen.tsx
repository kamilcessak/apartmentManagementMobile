import { useCallback } from "react";
import { Text, View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { HeaderTitle } from "@navigation/header";

export const TenantsScreen = () => {
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
          headerTitle: () => <HeaderTitle children="Twoi najemcy" />,
        });
      }
    }, [])
  );

  return (
    <View>
      <Text>Tenants</Text>
    </View>
  );
};
