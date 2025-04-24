import { useCallback } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  ActivityIndicator,
  Button,
  Icon,
  IconButton,
  Text,
  useTheme,
} from "react-native-paper";
import { useQuery } from "@tanstack/react-query";

import { HeaderTitle } from "@navigation/header";
import { handleGetTenants } from "@services/tenants";
import { TenantListItem } from "@components/tenants";

export const TenantsScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();

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
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={64} />
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: 32,
        }}
      >
        <Icon
          source="alert-decagram-outline"
          size={128}
          color={theme.colors.customError}
        />
        <Text variant="headlineMedium" style={{ textAlign: "center" }}>
          Wystąpił błąd podczas pobierania listy wynajmujących.
        </Text>
        <Button onPress={() => refetch()} textColor={theme.colors.customError}>
          Spróbuj ponownie
        </Button>
      </View>
    );
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
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: 32,
          }}
        >
          <Icon source="account-question-outline" size={128} />
          <Text variant="headlineMedium" style={{ textAlign: "center" }}>
            Brak wynajmujących
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("NewTenant")}
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          borderWidth: 1,
          borderRadius: 50,
          borderColor: "black",
        }}
      >
        <IconButton icon="plus" size={32} style={{ margin: 0 }} />
      </TouchableOpacity>
    </View>
  );
};
