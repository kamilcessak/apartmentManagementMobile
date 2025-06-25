import { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { HeaderTitle } from "@navigation/header";
import { handleGetApartments } from "@services/apartments";
import { ErrorScreen, LoadingScreen } from "@screens/common";
import { AddIcon, EmptyList } from "@components/common";
import { IconButton, useTheme, Text } from "react-native-paper";
import { useToastNotification } from "@hooks/useToastNotification";

export const ApartmentsScreen = () => {
  const [isRefreshing, setisRefreshing] = useState(false);

  const navigation = useNavigation();
  const theme = useTheme();
  const { showNotification } = useToastNotification();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["apartments", "list"],
    queryFn: handleGetApartments,
  });

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
          headerLeft: () => null,
          headerTitle: () => <HeaderTitle children="Twoje apartamenty" />,
        });
      }

      refetch();
      return () => {};
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
  console.log({ data });

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
