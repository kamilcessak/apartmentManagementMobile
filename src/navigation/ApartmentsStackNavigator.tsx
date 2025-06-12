import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  ApartmentDetailsScreen,
  ApartmentsScreen,
  NewApartmentScreen,
} from "@screens/apartments";

const Stack = createNativeStackNavigator();

export const ApartmentsStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Apartments"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Apartments" component={ApartmentsScreen} />
    <Stack.Screen name="NewApartment" component={NewApartmentScreen} />
    <Stack.Screen name="ApartmentDetails" component={ApartmentDetailsScreen} />
  </Stack.Navigator>
);
