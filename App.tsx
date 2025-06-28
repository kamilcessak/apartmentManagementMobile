import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { ThemeProvider } from "styled-components/native";

import { HeaderLeft, HeaderTitle, HeaderRight } from "@navigation/header";
import { theme } from "@styles/theme";
import {
  AuthenticatedLandlordStackNavigator,
  AuthenticatedTenantStackNavigator,
  UnauthenticatedStackNavigator,
} from "@navigation/index";
import { AppProvider } from "src/contexts/AppContext";
import { styledTheme } from "@typings/styledTheme";
import { RootStackParamList } from "@typings/navigation.types";
import { useOfflineMode } from "@hooks/index";
import { OfflineView } from "@components/common";

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
  const { isOffline } = useOfflineMode();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={styledTheme}>
        <PaperProvider theme={theme}>
          <AppProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={"UnauthenticatedStack"}
                screenOptions={{
                  headerTitle: (props) => <HeaderTitle {...props} />,
                  headerLeft: (props) => <HeaderLeft {...props} />,
                  headerRight: (props) => <HeaderRight {...props} />,
                }}
              >
                <Stack.Screen
                  name="AuthenticatedLandlordStack"
                  component={AuthenticatedLandlordStackNavigator}
                />
                <Stack.Screen
                  name="AuthenticatedTenantStack"
                  component={AuthenticatedTenantStackNavigator}
                />
                <Stack.Screen
                  name="UnauthenticatedStack"
                  component={UnauthenticatedStackNavigator}
                />
              </Stack.Navigator>
            </NavigationContainer>
            {isOffline ? <OfflineView /> : null}
            <Toast />
          </AppProvider>
        </PaperProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
