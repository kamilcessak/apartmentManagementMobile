import { ScrollView, View } from "react-native";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { FC, useCallback } from "react";
import { useTheme } from "react-native-paper";

import { HeaderLeft, HeaderTitle } from "@navigation/header";
import { useQuery } from "@tanstack/react-query";
import { handleGetApartment } from "@services/apartments";
import { ErrorScreen, LoadingScreen } from "@screens/common";
import { DescriptionSection } from "@components/common";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  ApartmentsStackNavigatorParamList,
  MainNavigationPropType,
} from "@typings/navigation.types";

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
          headerLeft: () => (
            <HeaderLeft canGoBack goBack={() => navigation.goBack()} />
          ),
          headerTitle: () => (
            <HeaderTitle children="Szczegóły apartamentu" isLeftVisible />
          ),
        });
      }

      return () => {};
    }, [navigation])
  );

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
