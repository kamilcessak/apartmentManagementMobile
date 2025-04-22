import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { InitialScreen, SignInScreen } from "@screens/auth";

const Stack = createNativeStackNavigator();

export const UnauthenticatedStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="InitialScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="InitialScreen" component={InitialScreen} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
  </Stack.Navigator>
);
