import { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { handleGetApartments } from "@services/apartments";
import { ErrorScreen, LoadingScreen } from "@screens/common";
import { AddIcon, EmptyList } from "@components/common";
import { IconButton, Text } from "react-native-paper";
import { useToastNotification } from "@hooks/useToastNotification";
import { StackNavigationProp } from "@react-navigation/stack";
import { ApartmentsStackNavigatorParamList } from "@typings/navigation.types";
import useHeaderOptions from "@hooks/useHeaderOptions";
import { useAppTheme } from "@hooks/useAppTheme";

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
    return <ErrorScreen onRetry={refetch} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {data?.length ? (
        <ScrollView
          contentContainerStyle={{ padding: 16, gap: 16 }}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={isRefreshing} />
          }
        >
          {data.map((e, i) => (
            <TouchableOpacity
              key={`apartment-item-${e._id}-${i}`}
              onPress={() =>
                navigation.navigate("ApartmentDetails", { id: e._id })
              }
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: theme.colors.grayTertiary,
                paddingHorizontal: 8,
                paddingVertical: 16,
                borderRadius: 8,
              }}
            >
              <IconButton
                icon="home-city"
                size={32}
                style={{ margin: 0, marginRight: 4 }}
              />
              <View style={{ gap: 8, flex: 1 }}>
                <Text
                  variant="titleLarge"
                  numberOfLines={2}
                  style={{ flexShrink: 1, flexWrap: "wrap" }}
                >
                  {e.address}
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{
                    color: e.isAvailable
                      ? theme.colors.customSuccess
                      : theme.colors.customError,
                  }}
                >
                  {e.isAvailable ? `Jest dostępne` : `Jest zajęte`}
                </Text>
              </View>
              <IconButton
                icon="chevron-right"
                size={32}
                style={{ margin: 0 }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <EmptyList message="Brak apartamentów" />
      )}
      <AddIcon onPress={() => navigation.navigate("NewApartment")} />
    </View>
  );
};
