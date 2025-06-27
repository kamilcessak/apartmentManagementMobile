import React, { useCallback, useMemo } from "react";
import { View, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTheme, Text, Button, Icon } from "react-native-paper";

import { HeaderTitle } from "@navigation/header";
import { useUserData } from "@hooks/useUserData";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { data } = useUserData();

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
          headerTitle: () => <HeaderTitle children="Strona główna" />,
        });
      }
    }, [])
  );

  const quickActions = [
    {
      title: "Dodaj apartament",
      onPress: () =>
        navigation.navigate("Mieszkania", { screen: "NewApartment" }),
    },
    {
      title: "Dodaj najemce",
      onPress: () => navigation.navigate("Najemcy", { screen: "NewTenant" }),
    },
    {
      title: "Zaktualizuj profil",
      onPress: () =>
        navigation.navigate("Ustawienia", { screen: "ProfileSettings" }),
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
            {quickActions.map((e, i) => (
              <Button
                key={`quick-action-${e.title}-${i}`}
                mode="outlined"
                style={{ borderRadius: 8 }}
                onPress={e.onPress}
              >
                {e.title}
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
