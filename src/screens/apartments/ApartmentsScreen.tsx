import { useCallback } from "react";
import { Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { HeaderTitle } from "@navigation/header";

export const ApartmentsScreen = () => {
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
          headerTitle: () => <HeaderTitle children="Twoje apartamenty" />,
        });
      }
    }, [])
  );

  return (
    <View>
      <Text>Apartments</Text>
    </View>
  );
};
