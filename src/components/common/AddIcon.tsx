import { FC } from "react";
import { IconButton } from "react-native-paper";
import styled from "styled-components/native";

import { DefaultTheme } from "@typings/styledTheme";

const Wrapper = styled.TouchableOpacity`
  position: absolute;
  bottom: 16px;
  right: 16px;
  border-width: 1px;
  border-radius: 50px;
  border-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.customBlack};
`;

type Props = {
  onPress: () => void;
};

export const AddIcon: FC<Props> = ({ onPress }) => (
  <Wrapper onPress={onPress}>
    <IconButton icon="plus" size={32} style={{ margin: 0 }} />
  </Wrapper>
);
