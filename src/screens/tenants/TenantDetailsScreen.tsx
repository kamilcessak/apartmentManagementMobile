import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { FC, useCallback } from "react";
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
import { DescriptionSection } from "@components/common";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  MainNavigationPropType,
  TenantsStackNavigatorParamList,
} from "@typings/navigation.types";

type NavigationPropType = StackNavigationProp<
  TenantsStackNavigatorParamList,
  "TenantDetails"
>;

type TenantDetailsScreenProps = RouteProp<
  TenantsStackNavigatorParamList,
  "TenantDetails"
>;

export const TenantDetailsScreen: FC<{ route: TenantDetailsScreenProps }> = ({
  route: { params },
}) => {
  const navigation = useNavigation<NavigationPropType>();
  const theme = useTheme();

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
          headerTitle: () => (
            <HeaderTitle
              children={`${params?.tenantName ?? "Szczegóły najemcy"}`}
              isLeftVisible
            />
          ),
          headerLeft: () => (
            <HeaderLeft canGoBack goBack={() => navigation.goBack()} />
          ),
        });
      }

      return () => {};
    }, [navigation])
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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <DescriptionSection
          title="Dane podstawowe"
          data={[
            { icon: "identifier", value: `${data?._id}` },
            { label: "Imie:", value: `${data?.firstName}` },
            { label: "Nazwisko:", value: `${data?.lastName}` },
            { icon: "email", value: `${data?.email}` },
            { icon: "phone", value: `${data?.phoneNumber}` },
            { icon: "home", value: `${data?.address}` },
          ]}
        />
        <DescriptionSection
          title="Kod zaproszenia"
          data={[{ icon: "send", value: `${data?.invitationCode}` }]}
        />
        <DescriptionSection
          title="Przypisany apartament"
          data={[
            {
              icon: "home-city",
              value: `${
                data?.assignedApartmentID ?? "Nie przypisano apartamentu"
              }`,
            },
          ]}
        />
      </ScrollView>
    </View>
  );
};
