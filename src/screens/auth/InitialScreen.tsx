import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Text } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import styled from "styled-components/native";

import { useUserData } from "@hooks/useUserData";
import {
  RootStackParamList,
  UnauthenticatedStackParamList,
} from "@typings/navigation.types";
import useHeaderOptions from "@hooks/useHeaderOptions";
import { DefaultTheme } from "@typings/styledTheme";

const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.customBackground};
  padding: 16px;
  align-items: center;
  width: 100%;
  padding-top: 64px;
`;

const StyledImage = styled.Image`
  width: 128px;
  height: 128px;
  border-radius: 128px;
`;

type CombinedParamList = UnauthenticatedStackParamList & RootStackParamList;

type NavigationPropType = StackNavigationProp<
  CombinedParamList,
  "InitialScreen"
>;

export const InitialScreen = () => {
  const navigation = useNavigation<NavigationPropType>();
  const { data, isLoading } = useUserData();

  useHeaderOptions(navigation, {
    title: "Apartment Management",
  });

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token?.length && data && Object.keys(data)?.length) {
      if (data?.role === "Landlord") {
        navigation.replace("AuthenticatedLandlordStack", { screen: "Home" });
      } else {
        navigation.replace("AuthenticatedTenantStack", { screen: "Home" });
      }
    }
  };

  useEffect(() => {
    void getToken();
  }, [isLoading]);

  return (
    <Wrapper>
      <Text variant="displaySmall">{`Witaj w aplikacji`}</Text>
      <View style={{ alignItems: "center", paddingVertical: 32 }}>
        <StyledImage source={require("@assets/images/logo.png")} />
      </View>
      <Button
        mode="outlined"
        style={{ width: "100%" }}
        onPress={() => navigation.navigate("SignInScreen")}
      >
        {`Zaloguj się`}
      </Button>
    </Wrapper>
  );
};
