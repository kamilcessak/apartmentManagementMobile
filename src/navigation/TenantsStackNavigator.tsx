import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TenantsScreen } from "@screens/tenants";

const Stack = createNativeStackNavigator();

export const TenantsStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Tenants"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Tenants" component={TenantsScreen} />
  </Stack.Navigator>
);
