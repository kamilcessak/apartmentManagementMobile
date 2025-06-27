import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProfileSettings, SettingsScreen } from "@screens/settings";
import { SettingsStackNavigatorParamList } from "@typings/navigation.types";

const Stack = createNativeStackNavigator<SettingsStackNavigatorParamList>();

export const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
    </Stack.Navigator>
  );
};
