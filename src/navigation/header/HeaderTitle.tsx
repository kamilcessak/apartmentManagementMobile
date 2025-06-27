import React, { FC, useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import styled from "styled-components/native";

import { DefaultTheme } from "@typings/styledTheme";

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const LogoWrapper = styled.View`
  border-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.graySecondary};
  border-width: 1px;
  border-radius: 30px;
  padding: 4px;
`;

const StyledImage = styled.Image`
  width: 30px;
  height: 30px;
`;

type Props = {
  children: string;
  tintColor?: string;
  isLeftVisible?: boolean;
};

export const HeaderTitle: FC<Props> = ({ children, isLeftVisible }) => {
  const { width } = useWindowDimensions();

  const calculatedWidth = useMemo(
    () => width - 16 * 2 - (isLeftVisible ? 64 : 0),
    [width, isLeftVisible]
  );

  return (
    <Wrapper
      style={{
        width: calculatedWidth,
      }}
    >
      <LogoWrapper>
        <StyledImage
          source={require("@assets/images/logo_icon.png")}
          resizeMode="contain"
        />
      </LogoWrapper>
      <Text variant="titleLarge">{children}</Text>
    </Wrapper>
  );
};
