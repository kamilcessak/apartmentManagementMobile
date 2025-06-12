import { useCallback } from "react";
import { ScrollView, View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { HeaderTitle } from "@navigation/header";
import { handleGetTenants } from "@services/tenants";
import { TenantListItem } from "@components/tenants";
import { ErrorScreen, LoadingScreen } from "@screens/common";
import { AddIcon, EmptyList } from "@components/common";

export const TenantsScreen = () => {
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen onRetry={refetch} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {data?.length ? (
        <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
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
