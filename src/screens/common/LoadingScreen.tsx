import { ActivityIndicator } from "react-native-paper";
import styled from "styled-components/native";

import { DefaultTheme } from "@typings/styledTheme";

const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.customBackground};
  align-items: center;
  justify-content: center;
`;

export const LoadingScreen = () => (
  <Wrapper>
    <ActivityIndicator size={64} />
  </Wrapper>
);
