import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { ScrollView, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Icon,
  Text,
  useTheme,
} from "react-native-paper";
import { useQuery } from "@tanstack/react-query";

import { HeaderLeft, HeaderTitle } from "@navigation/header";
import { handleGetTenant } from "@services/tenants";

export const TenantDetailsScreen = ({ route: { params } }) => {
  const navigation = useNavigation();
  const theme = useTheme();

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
          headerTitle: () => (
            <HeaderTitle
              children={`${params?.tenantName ?? "Szczegóły najemcy"}`}
            />
          ),
          headerLeft: () => (
            <HeaderLeft canGoBack goBack={() => navigation.goBack()} />
          ),
        });
      }
    }, [])
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["tenant", `${params.id}`, "details"],
    queryFn: () => handleGetTenant(params.id),
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ActivityIndicator size={64} />
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: 32,
        }}
      >
        <Icon
          source="alert-decagram-outline"
          size={128}
          color={theme.colors.customError}
        />
        <Text variant="headlineMedium" style={{ textAlign: "center" }}>
          Wystąpił błąd podczas pobierania danych wynajmującego.
        </Text>
        <Button onPress={() => refetch()} textColor={theme.colors.customError}>
          Spróbuj ponownie
        </Button>
      </View>
    );
  }

  const detailsData = [
    { label: "ID", value: data?._id },
    { label: "Imię", value: data?.firstName },
    { label: "Nazwisko", value: data?.lastName },
    { label: "Adres email", value: data?.email },
    { label: "Numer telefonu", value: data?.phoneNumber },
    { label: "Adres zamieszkania", value: data?.address },
    { label: "Kod zaproszenia", value: data?.invitationCode },
    {
      label: "Przypisane ID apartamentu",
      value: data?.assignedApartmentID ?? "Nie przypisano apartamentu",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        {detailsData.map((e, i) => (
          <View>
            <Text
              variant="bodyLarge"
              style={{ textDecorationLine: "underline" }}
            >{`${e.label}:`}</Text>
            <Text variant="titleLarge">{e.value}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
