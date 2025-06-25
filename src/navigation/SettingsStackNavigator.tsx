import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ProfileSettings, SettingsScreen } from "@screens/settings";

const Stack = createNativeStackNavigator();

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
