import React, { useCallback } from "react";
import { View, Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { HeaderTitle } from "@navigation/header";

export const HomeScreen = () => {
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
          headerTitle: () => <HeaderTitle children="Strona główna" />,
        });
      }
    }, [])
  );

  return (
    <View>
      <Text>Hejka naklejka</Text>
    </View>
  );
};
