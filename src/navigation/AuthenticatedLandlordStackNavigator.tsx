import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconButton, useTheme } from "react-native-paper";

import { HomeScreen } from "@screens/HomeScreen";
import { TenantsStackNavigator } from "./TenantsStackNavigator";
import { ApartmentsStackNavigator } from "./ApartmentsStackNavigator";
import { CustomMD3Theme } from "@styles/theme";
import { SettingsStackNavigator } from "./SettingsStackNavigator";

const Tab = createBottomTabNavigator();

export const AuthenticatedLandlordStackNavigator = () => {
  const theme = useTheme<CustomMD3Theme>();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.customPrimary,
        tabBarInactiveTintColor: theme.colors.customBlack,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <IconButton
              icon="home"
              size={size}
              iconColor={
                focused
                  ? theme.colors.customPrimary
                  : theme.colors.graySecondary
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Najemcy"
        component={TenantsStackNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <IconButton
              icon="human-male-female"
              size={size}
              iconColor={
                focused
                  ? theme.colors.customPrimary
                  : theme.colors.graySecondary
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Mieszkania"
        component={ApartmentsStackNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <IconButton
              icon="home-city-outline"
              size={size}
              iconColor={
                focused
                  ? theme.colors.customPrimary
                  : theme.colors.graySecondary
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Ustawienia"
        component={SettingsStackNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <IconButton
              icon="cog"
              size={size}
              iconColor={
                focused
                  ? theme.colors.customPrimary
                  : theme.colors.graySecondary
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
