import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { Text, View } from "react-native";

import { HeaderTitle } from "@navigation/header";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const signOut = () => {
    AsyncStorage.setItem("token", "");
    navigation.replace("UnauthenticatedStack");
  };

  return (
    <View>
      <Text>Ustawienia</Text>
      <Button mode="outlined" onPress={signOut}>
        Wyloguj
      </Button>
    </View>
  );
};
