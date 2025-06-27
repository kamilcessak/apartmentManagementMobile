import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { StackNavigationProp } from "@react-navigation/stack";

import { handleGetTenants } from "@services/tenants";
import { TenantListItem } from "@components/tenants";
import { ErrorScreen, LoadingScreen } from "@screens/common";
import { AddIcon, EmptyList } from "@components/common";
import { useToastNotification } from "@hooks/useToastNotification";
import { TenantsStackNavigatorParamList } from "@typings/navigation.types";
import useHeaderOptions from "@hooks/useHeaderOptions";
import { useAppTheme } from "@hooks/useAppTheme";

type NavigationPropType = StackNavigationProp<
  TenantsStackNavigatorParamList,
  "Tenants"
>;

export const TenantsScreen = () => {
  const [isRefreshing, setisRefreshing] = useState(false);

  const { showNotification } = useToastNotification();
  const navigation = useNavigation<NavigationPropType>();
  const theme = useAppTheme();

  useHeaderOptions(navigation, {
    title: "Twoi najemcy",
  });

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
    return (
      <ErrorScreen
        onRetry={refetch}
        message="Wystąpił błąd podczas pobierania listy wynajmujących."
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.customBackground }}>
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
