import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SettingsScreen } from "@screens/settings";

const Stack = createNativeStackNavigator();

export const SettingsStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Settings"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);
