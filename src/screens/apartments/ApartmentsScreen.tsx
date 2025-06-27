import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { StackNavigationProp } from "@react-navigation/stack";

import { handleGetApartments } from "@services/apartments";
import { ErrorScreen, LoadingScreen } from "@screens/common";
import { AddIcon, EmptyList } from "@components/common";
import { useToastNotification } from "@hooks/useToastNotification";
import { ApartmentsStackNavigatorParamList } from "@typings/navigation.types";
import useHeaderOptions from "@hooks/useHeaderOptions";
import { useAppTheme } from "@hooks/useAppTheme";
import { ApartmentListItem } from "@components/apartments";

type NavigationPropType = StackNavigationProp<
  ApartmentsStackNavigatorParamList,
  "Apartments"
>;

export const ApartmentsScreen = () => {
  const [isRefreshing, setisRefreshing] = useState(false);

  const navigation = useNavigation<NavigationPropType>();
  const theme = useAppTheme();
  const { showNotification } = useToastNotification();

  useHeaderOptions(navigation, {
    title: "Twoje apartamenty",
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["apartments", "list"],
    queryFn: handleGetApartments,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const onRefresh = () => {
    try {
      setisRefreshing(true);
      refetch();
    } catch (error) {
      console.error(error);
      showNotification("Wystąpił błąd podczas odświezania danych.", "error");
    } finally {
      setisRefreshing(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <ErrorScreen
        onRetry={refetch}
        message="Wystąpił błąd podczas pobierania listy apartamentów."
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.customBackground }}>
      {data?.length ? (
        <ScrollView
          contentContainerStyle={{ padding: 16, gap: 16 }}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={isRefreshing} />
          }
        >
          {data.map(({ address, isAvailable, _id: id }, i) => (
            <ApartmentListItem
              key={`apartment-item-${id}-${i}`}
              address={address}
              isAvailable={isAvailable}
              onPress={() => navigation.navigate("ApartmentDetails", { id })}
            />
          ))}
        </ScrollView>
      ) : (
        <EmptyList message="Brak apartamentów" />
      )}
      <AddIcon onPress={() => navigation.navigate("NewApartment")} />
    </View>
  );
};
