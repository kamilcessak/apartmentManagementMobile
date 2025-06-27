import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useHeaderHeight } from "@react-navigation/elements";
import { TextInput, Button } from "react-native-paper";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";

import { handleLogin } from "@services/auth";
import {
  RootStackParamList,
  UnauthenticatedStackParamList,
} from "@typings/navigation.types";
import useHeaderOptions from "@hooks/useHeaderOptions";
import { useAppTheme } from "@hooks/useAppTheme";
import styled from "styled-components/native";

const StyledImage = styled.Image`
  width: 128px;
  height: 128px;
  border-radius: 128px;
`;

const schema = yup.object().shape({
  email: yup.string().required("Email jest wymagany."),
  password: yup.string().required("Hasło jest wymagane."),
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
  const theme = useAppTheme();

  useHeaderOptions(navigation, {
    title: "Logowanie",
    headerLeftConfig: {
      canGoBack: navigation.canGoBack(),
      goBackAction: navigation.goBack,
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const handleOnSuccess = async (data: any) => {
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
      alert("Wystąpił błąd logowania!");
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleLogin,
    onSuccess: handleOnSuccess,
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

  const onSubmit = ({ email, password }: FormValues) =>
    mutate({
      email: email.toLowerCase(),
      password,
    });

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.customBackground }}>
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={{
          padding: 16,
          gap: 16,
        }}
      >
        <View style={{ alignItems: "center", paddingVertical: 32 }}>
          <StyledImage source={require("@assets/images/logo.png")} />
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
          {`Zaloguj się`}
        </Button>
      </ScrollView>
    </View>
  );
};
