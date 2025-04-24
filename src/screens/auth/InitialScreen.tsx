import { View, Image } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Text } from "react-native-paper";

import { HeaderTitle } from "@navigation/header";
import { useUserData } from "@hooks/useUserData";

export const InitialScreen = () => {
  const navigation = useNavigation();
  const { data, isLoading } = useUserData();

  useFocusEffect(
    useCallback(() => {
      let parent = navigation;
      while (parent && parent.getParent) {
        const newParent = parent.getParent();
        if (!newParent) break;
        parent = newParent;
      }

      if (parent) {
        parent.setOptions({
          headerTitle: () => <HeaderTitle children="Apartment Management" />,
        });
      }
    }, [])
  );

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token?.length && Object.keys(data)?.length) {
      navigation.replace(
        data.role === "Landlord"
          ? "AuthenticatedLandlordStack"
          : "AuthenticatedTenantStack"
      );
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
