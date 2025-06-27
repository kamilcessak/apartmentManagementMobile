import { RouteProp, useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { ScrollView, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { StackNavigationProp } from "@react-navigation/stack";

import { handleGetTenant } from "@services/tenants";
import { DescriptionSection } from "@components/common";
import { TenantsStackNavigatorParamList } from "@typings/navigation.types";
import useHeaderOptions from "@hooks/useHeaderOptions";
import { useAppTheme } from "@hooks/useAppTheme";
import { ErrorScreen, LoadingScreen } from "@screens/common";

type NavigationPropType = StackNavigationProp<
  TenantsStackNavigatorParamList,
  "TenantDetails"
>;

type TenantDetailsScreenProps = RouteProp<
  TenantsStackNavigatorParamList,
  "TenantDetails"
>;

export const TenantDetailsScreen: FC<{ route: TenantDetailsScreenProps }> = ({
  route: {
    params: { id, ...params },
  },
}) => {
  const navigation = useNavigation<NavigationPropType>();
  const theme = useAppTheme();

  useHeaderOptions(navigation, {
    title: `${params?.tenantName ?? "Szczegóły najemcy"}`,
    headerLeftConfig: {
      canGoBack: navigation.canGoBack(),
      goBackAction: navigation.goBack,
    },
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["tenant", `${id}`, "details"],
    queryFn: () => handleGetTenant(id),
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <ErrorScreen
        onRetry={refetch}
        message="Wystąpił błąd podczas pobierania danych wynajmującego."
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.customBackground }}>
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
