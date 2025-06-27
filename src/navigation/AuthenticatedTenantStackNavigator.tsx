import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconButton, useTheme } from "react-native-paper";

import { HomeScreen } from "@screens/HomeScreen";
import { CustomMD3Theme } from "@styles/theme";
import { TenantRentalScreen } from "@screens/rentals";
import { TenantStackParamList } from "@typings/navigation.types";

import { SettingsStackNavigator } from "./SettingsStackNavigator";

const Tab = createBottomTabNavigator<TenantStackParamList>();

export const AuthenticatedTenantStackNavigator = () => {
  const theme = useTheme<CustomMD3Theme>();

  const iconColor = (focused: boolean) =>
    focused ? theme.colors.customPrimary : theme.colors.graySecondary;

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
              iconColor={iconColor(focused)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Wynajem"
        component={TenantRentalScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <IconButton icon="cog" size={size} iconColor={iconColor(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name="Ustawienia"
        component={SettingsStackNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <IconButton icon="cog" size={size} iconColor={iconColor(focused)} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
