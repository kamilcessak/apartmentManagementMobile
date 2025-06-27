import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { ScrollView, View } from "react-native";

import { HeaderTitle } from "@navigation/header";
import { Button, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  MainNavigationPropType,
  RootStackParamList,
  SettingsStackNavigatorParamList,
} from "@typings/navigation.types";

type CombinedParamList = SettingsStackNavigatorParamList & RootStackParamList;

type NavigationPropType = StackNavigationProp<CombinedParamList, "Settings">;

export const SettingsScreen = () => {
  const navigation = useNavigation<NavigationPropType>();
  const theme = useTheme();

  useFocusEffect(
    useCallback(() => {
      let parent: MainNavigationPropType | null =
        navigation as MainNavigationPropType;
      while (parent && "getParent" in parent) {
        const newParent = parent.getParent();
        if (!newParent) break;
        parent = newParent as MainNavigationPropType;
      }

      if (parent) {
        parent.setOptions({
          headerLeft: () => null,
          headerTitle: () => <HeaderTitle children="Ustawienia" />,
        });
      }

      return () => {};
    }, [navigation])
  );

  const signOut = () => {
    AsyncStorage.setItem("token", "");
    navigation.replace("UnauthenticatedStack", { screen: "InitialScreen" });
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
