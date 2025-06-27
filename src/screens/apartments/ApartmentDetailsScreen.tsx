import { ScrollView, View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { StackNavigationProp } from "@react-navigation/stack";

import { handleGetApartment } from "@services/apartments";
import { ErrorScreen, LoadingScreen } from "@screens/common";
import { DescriptionSection } from "@components/common";
import { ApartmentsStackNavigatorParamList } from "@typings/navigation.types";
import useHeaderOptions from "@hooks/useHeaderOptions";
import { useAppTheme } from "@hooks/useAppTheme";

type NavigationPropType = StackNavigationProp<
  ApartmentsStackNavigatorParamList,
  "ApartmentDetails"
>;

type TenantDetailsScreenProps = RouteProp<
  ApartmentsStackNavigatorParamList,
  "ApartmentDetails"
>;

export const ApartmentDetailsScreen: FC<{
  route: TenantDetailsScreenProps;
}> = ({
  route: {
    params: { id },
  },
}) => {
  const navigation = useNavigation<NavigationPropType>();
  const theme = useAppTheme();

  useHeaderOptions(navigation, {
    title: "Szczegóły apartamentu",
    headerLeftConfig: {
      canGoBack: navigation.canGoBack(),
      goBackAction: navigation.goBack,
    },
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["apartments", "list"],
    queryFn: () => handleGetApartment(id),
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <ErrorScreen
        onRetry={refetch}
        message="Wystąpił błąd podczas pobierania szczegółów apartamentu."
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
            { icon: "map-marker", value: `${data?.address}` },
            {
              icon: "check-circle",
              value: `${data?.isAvailable ? "Dostępny" : "Niedostępny"}`,
              color: data?.isAvailable
                ? theme.colors.customSuccess
                : theme.colors.customError,
            },
          ]}
        />
        <DescriptionSection
          title="Parametry mieszkania"
          data={[
            { label: "Metraz:", value: `${data?.metric}m2` },
            { label: "Liczba pokoi:", value: `${data?.roomCount}` },
            { label: "Czynsz:", value: `${data?.monthlyCost}zł` },
          ]}
        />
        <DescriptionSection
          title="Opis mieszkania"
          data={[
            {
              value: `${data?.description}`,
              disableNumberOfLines: true,
            },
          ]}
        />
        {data?.equipment?.length ? (
          <DescriptionSection
            title="Wyposazenie mieszkania"
            data={[
              {
                value: data?.equipment,
                disableNumberOfLines: true,
              },
            ]}
          />
        ) : null}
        {data?.documents?.length ? (
          <DescriptionSection
            title="Dokumenty"
            data={[
              {
                files: data.documents,
              },
            ]}
          />
        ) : null}
        {data?.photos?.length ? (
          <DescriptionSection
            title="Zdjęcia"
            data={[
              {
                files: data.photos,
              },
            ]}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};
