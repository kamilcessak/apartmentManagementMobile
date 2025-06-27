import { ScrollView, View } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { FC } from "react";
import { useTheme } from "react-native-paper";

import { useQuery } from "@tanstack/react-query";
import { handleGetApartment } from "@services/apartments";
import { ErrorScreen, LoadingScreen } from "@screens/common";
import { DescriptionSection } from "@components/common";
import { StackNavigationProp } from "@react-navigation/stack";
import { ApartmentsStackNavigatorParamList } from "@typings/navigation.types";
import useHeaderOptions from "@hooks/useHeaderOptions";

type NavigationPropType = StackNavigationProp<
  ApartmentsStackNavigatorParamList,
  "ApartmentDetails"
>;

type TenantDetailsScreenProps = RouteProp<
  ApartmentsStackNavigatorParamList,
  "ApartmentDetails"
>;

export const ApartmentDetailsScreen: FC<{ route: TenantDetailsScreenProps }> = (
  props
) => {
  const navigation = useNavigation<NavigationPropType>();
  const theme = useTheme();

  useHeaderOptions(navigation, {
    title: "Szczegóły apartamentu",
    headerLeftConfig: {
      canGoBack: navigation.canGoBack(),
      goBackAction: navigation.goBack,
    },
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["apartments", "list"],
    queryFn: () => handleGetApartment(props.route.params.id),
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen onRetry={refetch} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
