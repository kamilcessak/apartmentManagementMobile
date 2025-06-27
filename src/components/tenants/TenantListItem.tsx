import { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { getRandomRgbaColor } from "@utils/generateRandomColor";
import { TenantType } from "@typings/tenant.types";
import { TenantsStackNavigatorParamList } from "@typings/navigation.types";

const Wrapper = styled.View`
  border-width: 1px;
  border-color: black;
  padding: 16px;
  border-radius: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

const AvatarWrapper = styled.View`
  padding: 16px;
  border-width: 1px;
  border-color: black;
  border-radius: 32px;
`;

type NavigationPropType = StackNavigationProp<
  TenantsStackNavigatorParamList,
  "Tenants"
>;

type Props = TenantType;

export const TenantListItem: FC<Props> = ({
  firstName,
  lastName,
  assignedApartmentID,
  phoneNumber,
  _id,
}) => {
  const navigation = useNavigation<NavigationPropType>();

  const handleNavigateToTenant = () =>
    navigation.navigate("TenantDetails", {
      id: _id,
      tenantName: `${firstName} ${lastName}`,
    });

  return (
    <Wrapper>
      <AvatarWrapper
        style={{
          backgroundColor: getRandomRgbaColor(),
        }}
      >
        <Text variant="headlineSmall">{`${firstName[0]}${lastName[0]}`}</Text>
      </AvatarWrapper>
      <View style={{ gap: 4, flex: 1 }}>
        <Text
          variant="titleLarge"
          numberOfLines={2}
        >{`${firstName} ${lastName}`}</Text>
        <Text variant="bodyMedium" numberOfLines={1}>{`${
          assignedApartmentID ?? "Nie przypisano do apartamentu"
        }`}</Text>
        <Text variant="bodyMedium">{phoneNumber}</Text>
      </View>
      <TouchableOpacity onPress={handleNavigateToTenant}>
        <IconButton
          icon="account-eye-outline"
          size={32}
          style={{ margin: 0 }}
        />
      </TouchableOpacity>
    </Wrapper>
  );
};
