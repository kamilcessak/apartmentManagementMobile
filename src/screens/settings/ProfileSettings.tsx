import { CommonActions, useNavigation } from "@react-navigation/native";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import { handleUpdateProfile } from "@services/settings";
import { useToastNotification } from "@hooks/useToastNotification";
import { StackNavigationProp } from "@react-navigation/stack";
import { SettingsStackNavigatorParamList } from "@typings/navigation.types";
import useHeaderOptions from "@hooks/useHeaderOptions";
import { useAppTheme } from "@hooks/useAppTheme";

const schema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
});

type FormValues = {
  firstName?: string;
  lastName?: string;
};

type NavigationPropType = StackNavigationProp<
  SettingsStackNavigatorParamList,
  "ProfileSettings"
>;

export const ProfileSettings = () => {
  const navigation = useNavigation<NavigationPropType>();
  const theme = useAppTheme();
  const { showNotification } = useToastNotification();

  useHeaderOptions(navigation, {
    title: "Ustawienia profilu",
    headerLeftConfig: {
      canGoBack: navigation.canGoBack(),
      goBackAction: () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Settings" }],
          })
        );
        navigation.dispatch(CommonActions.goBack());
      },
    },
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: handleUpdateProfile,
    onSuccess: () => {
      showNotification(
        "Pomyślnie zaktualizowano profil uzytkownika.",
        "success"
      );
    },
    onError: () => {
      showNotification(
        "Wystąpił błąd podczas aktualizowania profilu.",
        "error"
      );
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.customBackground }}
    >
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <TextInput
          label="Imię"
          mode="outlined"
          {...register("firstName")}
          onChangeText={(text: string) => setValue("firstName", text)}
          error={!!errors.firstName}
        />
        <TextInput
          label="Nazwisko"
          mode="outlined"
          {...register("lastName")}
          onChangeText={(text: string) => setValue("lastName", text)}
          error={!!errors.lastName}
        />
        <Button mode="outlined" onPress={handleSubmit(onSubmit)}>
          Zapisz dane
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
