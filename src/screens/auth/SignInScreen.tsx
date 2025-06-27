import { Image, ScrollView, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import Toast from "react-native-toast-message";
import { useHeaderHeight } from "@react-navigation/elements";
import { TextInput, Button } from "react-native-paper";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HeaderTitle } from "@navigation/header";
import { handleLogin } from "@services/auth";
import {
  MainNavigationPropType,
  RootStackParamList,
  UnauthenticatedStackParamList,
} from "@typings/navigation.types";
import { StackNavigationProp } from "@react-navigation/stack";

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

type FormValues = {
  email: string;
  password: string;
};

type CombinedParamList = UnauthenticatedStackParamList & RootStackParamList;

type NavigationPropType = StackNavigationProp<
  CombinedParamList,
  "InitialScreen"
>;

export const SignInScreen = () => {
  const navigation = useNavigation<NavigationPropType>();
  const headerHeight = useHeaderHeight();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  useFocusEffect(
    useCallback(() => {
      let parent: MainNavigationPropType | null =
        navigation as MainNavigationPropType;
      while (parent && "getParent" in parent) {
        const newParent = parent.getParent();
        if (!newParent) break;
        parent = newParent as MainNavigationPropType;
      }

      if (parent) {
        parent.setOptions({
          headerTitle: () => <HeaderTitle children="Apartment Management" />,
        });
      }

      return () => {};
    }, [navigation])
  );

  const { mutate, isPending } = useMutation({
    mutationFn: handleLogin,
    onSuccess: async (data) => {
      if (data?.data.token) {
        await AsyncStorage.setItem("token", data.data.token);
        const isLandlord = data.data.user.role === "Landlord";
        Toast.show({
          type: "success",
          text1: "Pomyślnie zalogowano do konta!",
          topOffset: headerHeight + 16,
          onPress: () => Toast.hide(),
        });

        if (isLandlord) {
          navigation.replace("AuthenticatedLandlordStack", { screen: "Home" });
        } else {
          navigation.replace("AuthenticatedTenantStack", { screen: "Home" });
        }
      } else {
        alert("Login failed");
      }
    },
    onError: (error) => {
      console.error(error);
      Toast.show({
        type: "error",
        text1: error?.message || "Error occurred",
        topOffset: headerHeight + 16,
        onPress: () => Toast.hide(),
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate({
      email: data.email.toLowerCase(),
      password: data.password,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={{
          padding: 16,
          gap: 16,
        }}
      >
        <View style={{ alignItems: "center", paddingVertical: 32 }}>
          <Image
            source={require("@assets/images/logo.png")}
            style={{ width: 128, height: 128, borderRadius: 128 }}
          />
        </View>
        <TextInput
          mode="outlined"
          label="Email"
          onChangeText={(value: string) => setValue("email", value)}
          error={!!errors.email}
        />
        <TextInput
          mode="outlined"
          label="Hasło"
          secureTextEntry
          onChangeText={(value: string) => setValue("password", value)}
          error={!!errors.password}
        />
        <Button
          mode="outlined"
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
        >
          Zaloguj się
        </Button>
      </ScrollView>
    </View>
  );
};
