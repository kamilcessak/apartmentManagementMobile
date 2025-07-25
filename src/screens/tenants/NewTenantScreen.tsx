import { ScrollView, View } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { StackNavigationProp } from "@react-navigation/stack";

import { handleAddTenant } from "@services/tenants";
import { useToastNotification } from "@hooks/useToastNotification";
import { TenantsStackNavigatorParamList } from "@typings/navigation.types";
import useHeaderOptions from "@hooks/useHeaderOptions";
import { useAppTheme } from "@hooks/useAppTheme";

const schema = yup.object().shape({
  firstName: yup.string().required("Imie jest wymagane."),
  lastName: yup.string().required("Nazwisko jest wymagane."),
  email: yup.string().required("Email jest wymagany."),
  phoneNumber: yup.string().required("Numer telefonu jest wymagany."),
  address: yup.string().required("Adres jest wymagany."),
});

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

type NavigationPropType = StackNavigationProp<
  TenantsStackNavigatorParamList,
  "NewTenant"
>;

export const NewTenantScreen = () => {
  const navigation = useNavigation<NavigationPropType>();
  const { showNotification } = useToastNotification();
  const theme = useAppTheme();

  useHeaderOptions(navigation, {
    title: "Nowy najemca",
    headerLeftConfig: {
      canGoBack: navigation.canGoBack(),
      goBackAction: () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Tenants" }],
          })
        );
        navigation.goBack();
      },
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: handleAddTenant,
    onSuccess: () => {
      showNotification("Pomyślnie dodano wynajmującego!", "success");
      navigation.goBack();
    },
    onError: () => {
      showNotification(
        "Wystąpił błąd podczas dodawania wynajmującego. Spróbuj ponownie.",
        "error"
      );
    },
  });

  const onSubmit = (data: FormValues) => mutate(data);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.customBackground }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <TextInput
          label="Imię"
          mode="outlined"
          onChangeText={(value: string) => setValue("firstName", value)}
          error={!!errors.firstName}
        />
        <TextInput
          label="Nazwisko"
          mode="outlined"
          onChangeText={(value: string) => setValue("lastName", value)}
          error={!!errors.lastName}
        />
        <TextInput
          label="Email"
          mode="outlined"
          onChangeText={(value: string) => setValue("email", value)}
          error={!!errors.email}
        />
        <TextInput
          label="Numer telefonu"
          mode="outlined"
          onChangeText={(value: string) => setValue("phoneNumber", value)}
          error={!!errors.phoneNumber}
        />
        <TextInput
          label="Adres zamieszkania"
          mode="outlined"
          onChangeText={(value: string) => setValue("address", value)}
          error={!!errors.address}
        />
      </ScrollView>
      <View style={{ padding: 16 }}>
        <Button
          mode="outlined"
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
        >
          {`Dodaj najemce`}
        </Button>
      </View>
    </View>
  );
};
