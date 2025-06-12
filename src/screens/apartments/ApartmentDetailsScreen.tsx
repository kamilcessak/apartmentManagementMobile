import { View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { Text } from "react-native-paper";

import { HeaderLeft, HeaderTitle } from "@navigation/header";

export const ApartmentDetailsScreen = () => {
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
          headerLeft: () => (
            <HeaderLeft canGoBack goBack={() => navigation.goBack()} />
          ),
          headerTitle: () => <HeaderTitle children="Szczegóły apartamentu" />,
        });
      }
    }, [])
  );

  return (
    <View>
      <Text>Szczegóły apartamentu</Text>
    </View>
  );
};
