import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { InitialScreen, SignInScreen } from "@screens/auth";
import { UnauthenticatedStackParamList } from "@typings/navigation.types";

const Stack = createNativeStackNavigator<UnauthenticatedStackParamList>();

export const UnauthenticatedStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="InitialScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="InitialScreen" component={InitialScreen} />
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
  </Stack.Navigator>
);
