import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ApartmentsScreen } from "@screens/apartments";

const Stack = createNativeStackNavigator();

export const ApartmentsStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Apartments"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Apartments" component={ApartmentsScreen} />
  </Stack.Navigator>
);
