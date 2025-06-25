import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { ScrollView, View } from "react-native";

import { HeaderTitle } from "@navigation/header";
import { Button, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SettingsScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();

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
          headerLeft: () => null,
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
    <View style={{ flex: 1, backgroundColor: theme.colors.customBackground }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("ProfileSettings")}
        >
          Ustawienia konta
        </Button>
        <Button mode="outlined" onPress={signOut}>
          Wyloguj
        </Button>
      </ScrollView>
    </View>
  );
};
