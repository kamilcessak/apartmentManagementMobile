import { useCallback } from "react";
import { ScrollView, View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { HeaderLeft, HeaderTitle } from "@navigation/header";
import { useMutation } from "@tanstack/react-query";
import { handleAddTenant } from "@services/tenants";
import { useToastNotification } from "@hooks/useToastNotification";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
});

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

export const NewTenantScreen = () => {
  const navigation = useNavigation();
  const { showNotification } = useToastNotification();

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
          headerTitle: () => <HeaderTitle children="Nowy najemca" />,
          headerLeft: () => (
            <HeaderLeft canGoBack goBack={() => navigation.goBack()} />
          ),
        });
      }
    }, [])
  );

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

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
          Dodaj najemce
        </Button>
      </View>
    </View>
  );
};
