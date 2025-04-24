import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconButton, useTheme } from "react-native-paper";

import { HomeScreen } from "@screens/HomeScreen";
import { CustomMD3Theme } from "@styles/theme";
import { SettingsStackNavigator } from "./SettingsStackNavigator";
import { TenantRentalScreen } from "@screens/rentals";

const Tab = createBottomTabNavigator();

export const AuthenticatedTenantStackNavigator = () => {
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
        name="Wynajem"
        component={TenantRentalScreen}
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
