import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Text } from "react-native-paper";

import { useUserData } from "@hooks/useUserData";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RootStackParamList,
  UnauthenticatedStackParamList,
} from "@typings/navigation.types";
import useHeaderOptions from "@hooks/useHeaderOptions";

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
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 16,
        alignItems: "center",
        width: "100%",
        paddingTop: 64,
      }}
    >
      <Text variant="displaySmall">Witaj w aplikacji</Text>
      <View style={{ alignItems: "center", paddingVertical: 32 }}>
        <Image
          source={require("@assets/images/logo.png")}
          style={{ width: 128, height: 128, borderRadius: 128 }}
        />
      </View>
      <Button
        mode="outlined"
        style={{ width: "100%" }}
        onPress={() => navigation.navigate("SignInScreen")}
      >
        Zaloguj się
      </Button>
    </View>
  );
};
