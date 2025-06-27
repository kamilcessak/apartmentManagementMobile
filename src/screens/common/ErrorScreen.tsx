import { FC } from "react";
import { Button, Icon, Text } from "react-native-paper";
import styled from "styled-components/native";

import { DefaultTheme } from "@typings/styledTheme";
import { useAppTheme } from "@hooks/useAppTheme";

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
  onRetry: () => void;
  message: string;
};

export const ErrorScreen: FC<Props> = ({ onRetry, message }) => {
  const theme = useAppTheme();

  return (
    <Wrapper>
      <Icon
        source="alert-decagram-outline"
        size={128}
        color={theme.colors.customError}
      />
      <Text variant="headlineMedium" style={{ textAlign: "center" }}>
        {message}
      </Text>
      <Button onPress={onRetry} textColor={theme.colors.customError}>
        {`Spróbuj ponownie`}
      </Button>
    </Wrapper>
  );
};
