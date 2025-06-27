import { FC } from "react";
import { Icon, Text } from "react-native-paper";
import styled from "styled-components/native";

import { DefaultTheme } from "@typings/styledTheme";

const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.customBackground};
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px;
`;

type Props = {
  message: string;
};

export const EmptyList: FC<Props> = ({ message }) => (
  <Wrapper>
    <Icon source="account-question-outline" size={128} />
    <Text variant="headlineMedium" style={{ textAlign: "center" }}>
      {message}
    </Text>
  </Wrapper>
);
