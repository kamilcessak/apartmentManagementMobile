import { FC } from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import styled from "styled-components/native";

import { useAppTheme } from "@hooks/useAppTheme";
import { DefaultTheme } from "@typings/styledTheme";

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.grayTertiary};
  padding-horizontal: 8px;
  padding-vertical: 16px;
  border-radius: 8px;
`;

type Props = {
  isAvailable: boolean;
  address: string;
  onPress: () => void;
};

export const ApartmentListItem: FC<Props> = ({
  isAvailable,
  address,
  onPress,
}) => {
  const {
    colors: { customSuccess, customError },
  } = useAppTheme();

  return (
    <Wrapper onPress={onPress}>
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
          {address}
        </Text>
        <Text
          variant="bodyMedium"
          style={{
            color: isAvailable ? customSuccess : customError,
          }}
        >
          {isAvailable ? `Jest dostępne` : `Jest zajęte`}
        </Text>
      </View>
      <IconButton icon="chevron-right" size={32} style={{ margin: 0 }} />
    </Wrapper>
  );
};
