import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";

import { HomeScreen } from "@screens/HomeScreen";
import { HeaderLeft, HeaderTitle, HeaderRight } from "@navigation/header";
import { theme } from "@styles/theme";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitle: (props) => <HeaderTitle {...props} />,
            headerLeft: (props) => <HeaderLeft />,
            headerRight: (props) => <HeaderRight />,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
