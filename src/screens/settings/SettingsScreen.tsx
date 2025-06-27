import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";

import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RootStackParamList,
  SettingsStackNavigatorParamList,
} from "@typings/navigation.types";
import useHeaderOptions from "@hooks/useHeaderOptions";
import { useAppTheme } from "@hooks/useAppTheme";

type CombinedParamList = SettingsStackNavigatorParamList & RootStackParamList;

type NavigationPropType = StackNavigationProp<CombinedParamList, "Settings">;

export const SettingsScreen = () => {
  const navigation = useNavigation<NavigationPropType>();
  const theme = useAppTheme();

  useHeaderOptions(navigation, {
    title: "Ustawienia",
  });

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
