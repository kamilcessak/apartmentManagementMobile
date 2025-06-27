import React, { useMemo } from "react";
import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, Button, Icon } from "react-native-paper";

import { useUserData } from "@hooks/useUserData";
import { LandlordStackParamList } from "@typings/navigation.types";
import useHeaderOptions from "@hooks/useHeaderOptions";
import { useAppTheme } from "@hooks/useAppTheme";

type NavigationPropType = StackNavigationProp<LandlordStackParamList, "Home">;

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationPropType>();
  const theme = useAppTheme();
  const { data } = useUserData();

  useHeaderOptions(navigation, {
    title: "Strona główna",
  });

  const quickActions = [
    {
      title: "Dodaj apartament",
      onPress: () => navigation.navigate("Flats", { screen: "NewApartment" }),
    },
    {
      title: "Dodaj najemce",
      onPress: () => navigation.navigate("Tenants", { screen: "NewTenant" }),
    },
    {
      title: "Zaktualizuj profil",
      onPress: () =>
        navigation.navigate("SettingsStack", { screen: "ProfileSettings" }),
    },
  ];

  const availableApartments = useMemo(
    () => data?.apartments.filter((e) => e.isAvailable).length,
    [data?.apartments]
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.customBackground }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        <View
          style={{
            backgroundColor: theme.colors.customSecondary,
            padding: 16,
            borderRadius: 8,
          }}
        >
          <Text
            testID="welcomeMessage"
            style={{ color: "white", fontWeight: "800", textAlign: "center" }}
            variant="titleLarge"
          >{`Witaj ${data?.firstName ?? ""} w ApartmentManagement!`}</Text>
        </View>
        <View style={{ gap: 8 }}>
          <Text variant="titleMedium">Szybkie akcje:</Text>
          <ScrollView horizontal contentContainerStyle={{ gap: 16 }}>
            {quickActions.map(({ title, onPress }, i) => (
              <Button
                key={`quick-action-${title}-${i}`}
                mode="outlined"
                style={{ borderRadius: 8 }}
                onPress={onPress}
              >
                {title}
              </Button>
            ))}
          </ScrollView>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Icon
            source="greenhouse"
            color={theme.colors.customSuccess}
            size={32}
          />
          <Text variant="bodyMedium">{`${availableApartments}/${data?.apartments.length} apartamentów jest dostępnych do wynajęcia.`}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
