import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  NewTenantScreen,
  TenantDetailsScreen,
  TenantsScreen,
} from "@screens/tenants";
import { TenantsStackNavigatorParamList } from "@typings/navigation.types";

const Stack = createNativeStackNavigator<TenantsStackNavigatorParamList>();

export const TenantsStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Tenants"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Tenants" component={TenantsScreen} />
    <Stack.Screen name="NewTenant" component={NewTenantScreen} />
    <Stack.Screen name="TenantDetails" component={TenantDetailsScreen} />
  </Stack.Navigator>
);
