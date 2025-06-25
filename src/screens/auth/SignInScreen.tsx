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

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

type FormValues = {
  email: string;
  password: string;
};

export const SignInScreen = () => {
  const navigation = useNavigation();
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
        navigation.replace(
          isLandlord ? "AuthenticatedLandlordStack" : "AuthenticatedTenantStack"
        );
      } else {
        alert("Login failed");
      }
    },
    onError: (error) => {
      console.error(error);
      Toast.show({
        type: "error",
        text1: error.response.data.error,
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
