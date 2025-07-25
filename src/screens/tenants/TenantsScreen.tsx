import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshControl, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlashList } from "@shopify/flash-list";

import { handleGetTenants } from "@services/tenants";
import { TenantListItem } from "@components/tenants";
import { ErrorScreen, LoadingScreen } from "@screens/common";
import { AddIcon, EmptyList } from "@components/common";
import { useToastNotification } from "@hooks/useToastNotification";
import { TenantsStackNavigatorParamList } from "@typings/navigation.types";
import useHeaderOptions from "@hooks/useHeaderOptions";
import { useAppTheme } from "@hooks/useAppTheme";
import { useTenantsContext } from "@contexts/TenantsContext";
import { useOfflineMode } from "@hooks/useOfflineMode";
import { TenantType } from "@typings/tenant.types";

type NavigationPropType = StackNavigationProp<
  TenantsStackNavigatorParamList,
  "Tenants"
>;

export const TenantsScreen = () => {
  const [isRefreshing, setisRefreshing] = useState(false);

  const { showNotification } = useToastNotification();
  const navigation = useNavigation<NavigationPropType>();
  const theme = useAppTheme();
  const { tenants, setTenants } = useTenantsContext();
  const { isOffline } = useOfflineMode();

  useHeaderOptions(navigation, {
    title: "Twoi najemcy",
  });

  const { data, isLoading, isSuccess, isError, refetch } = useQuery({
    queryFn: handleGetTenants,
    queryKey: ["tenants", "list"],
  });

  useEffect(() => {
    setTenants(data || []);
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
      return tenants;
    } else {
      return data;
    }
  }, [isOffline, data, tenants]);

  const renderItem = useCallback(
    ({ item }: { item: TenantType }) => <TenantListItem {...item} />,
    []
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <ErrorScreen
        onRetry={refetch}
        message="Wystąpił błąd podczas pobierania listy wynajmujących."
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
          keyExtractor={({ _id: id }, i) => `tenant-item-${id}-${i}`}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={renderItem}
        />
      ) : (
        <EmptyList message={"Brak wynajmujących"} />
      )}
      <AddIcon onPress={() => navigation.navigate("NewTenant")} />
    </View>
  );
};
