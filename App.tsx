import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";

import { HeaderLeft, HeaderTitle, HeaderRight } from "@navigation/header";
import { theme } from "@styles/theme";
import { UnauthenticatedStackNavigator } from "@navigation/index";
import { AuthenticatedStackNavigator } from "@navigation/AuthenticatedStackNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="UnauthenticatedStack"
          screenOptions={{
            headerTitle: (props) => <HeaderTitle {...props} />,
            headerLeft: (props) => <HeaderLeft {...props} />,
            headerRight: (props) => <HeaderRight {...props} />,
          }}
        >
          <Stack.Screen
            name="AuthenticatedStack"
            component={AuthenticatedStackNavigator}
          />
          <Stack.Screen
            name="UnauthenticatedStack"
            component={UnauthenticatedStackNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
