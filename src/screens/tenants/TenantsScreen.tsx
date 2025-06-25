import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { HeaderTitle } from "@navigation/header";
import { handleGetTenants } from "@services/tenants";
import { TenantListItem } from "@components/tenants";
import { ErrorScreen, LoadingScreen } from "@screens/common";
import { AddIcon, EmptyList } from "@components/common";
import { useToastNotification } from "@hooks/useToastNotification";

export const TenantsScreen = () => {
  const [isRefreshing, setisRefreshing] = useState(false);

  const { showNotification } = useToastNotification();
  const navigation = useNavigation();

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
          headerTitle: () => <HeaderTitle children="Twoi najemcy" />,
          headerLeft: () => null,
        });
      }
    }, [])
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: handleGetTenants,
    queryKey: ["tenants", "list"],
  });

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
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={isRefreshing} />
          }
          contentContainerStyle={{ padding: 16, gap: 16 }}
        >
          {data?.map((e, i) => (
            <TenantListItem {...e} key={`tenant-${e._id}-${i}`} />
          ))}
        </ScrollView>
      ) : (
        <EmptyList message={"Brak wynajmujących"} />
      )}
      <AddIcon onPress={() => navigation.navigate("NewTenant")} />
    </View>
  );
};
