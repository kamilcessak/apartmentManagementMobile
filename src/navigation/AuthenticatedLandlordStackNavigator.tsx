import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconButton, useTheme } from "react-native-paper";

import { HomeScreen } from "@screens/HomeScreen";
import { CustomMD3Theme } from "@styles/theme";
import { LandlordStackParamList } from "@typings/navigation.types";

import { SettingsStackNavigator } from "./SettingsStackNavigator";
import { TenantsStackNavigator } from "./TenantsStackNavigator";
import { ApartmentsStackNavigator } from "./ApartmentsStackNavigator";

const Tab = createBottomTabNavigator<LandlordStackParamList>();

export const AuthenticatedLandlordStackNavigator = () => {
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
        name="Tenants"
        component={TenantsStackNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <IconButton
              icon="human-male-female"
              size={size}
              iconColor={iconColor(focused)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Flats"
        component={ApartmentsStackNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <IconButton
              icon="home-city-outline"
              size={size}
              iconColor={iconColor(focused)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsStack"
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
