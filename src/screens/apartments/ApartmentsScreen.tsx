import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshControl, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
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
import { useApartmentsContext } from "@contexts/ApartmentsContext";
import { useOfflineMode } from "@hooks/useOfflineMode";
import { ApartmentType } from "@typings/apartment.types";

type NavigationPropType = StackNavigationProp<
  ApartmentsStackNavigatorParamList,
  "Apartments"
>;

export const ApartmentsScreen = () => {
  const [isRefreshing, setisRefreshing] = useState(false);

  const navigation = useNavigation<NavigationPropType>();
  const theme = useAppTheme();
  const { showNotification } = useToastNotification();
  const { apartments, setApartments } = useApartmentsContext();
  const { isOffline } = useOfflineMode();

  useHeaderOptions(navigation, {
    title: "Twoje apartamenty",
  });

  const { data, isLoading, isError, refetch, isSuccess } = useQuery({
    queryKey: ["apartments", "list"],
    queryFn: handleGetApartments,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  useEffect(() => {
    setApartments(data || []);
  }, [isSuccess]);

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

  const resultData = useMemo(() => {
    if (isOffline) {
      return apartments;
    } else {
      return data;
    }
  }, [isOffline, data, apartments]);

  const renderItem = useCallback(
    ({ item: { address, isAvailable, _id: id } }: { item: ApartmentType }) => (
      <ApartmentListItem
        address={address}
        isAvailable={isAvailable}
        onPress={() => navigation.navigate("ApartmentDetails", { id })}
      />
    ),
    []
  );

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
      {resultData?.length ? (
        <FlashList
          data={resultData}
          contentContainerStyle={{ padding: 16 }}
          estimatedItemSize={118}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={isRefreshing} />
          }
          keyExtractor={({ _id: id }, i) => `apartment-item-${id}-${i}`}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={renderItem}
        />
      ) : (
        <EmptyList message="Brak apartamentów" />
      )}
      <AddIcon onPress={() => navigation.navigate("NewApartment")} />
    </View>
  );
};
