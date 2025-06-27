import { FC } from "react";
import { Icon, IconButton, Text } from "react-native-paper";
import styled from "styled-components/native";

import { useAppTheme } from "@hooks/useAppTheme";
import { DefaultTheme } from "@typings/styledTheme";

const Wrapper = styled.View`
  width: "48%";
  margin-bottom: 16px;
  border-width: 1px;
  border-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.grayTertiary};
  border-radius: 8px;
  padding: 8px;
  align-items: "center";
`;

const ButtonsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

type Props = {
  name: string;
  handleShowFile?: () => void;
  handleDeleteFile?: () => void;
};

export const FileItem: FC<Props> = ({
  name,
  handleDeleteFile,
  handleShowFile,
}) => {
  const theme = useAppTheme();

  return (
    <Wrapper>
      <Icon source={"image"} size={64} />
      <Text numberOfLines={3} style={{ textAlign: "center" }}>
        {name}
      </Text>
      <ButtonsWrapper>
        {handleShowFile ? (
          <IconButton
            icon="eye"
            size={32}
            onPress={handleShowFile}
            iconColor={theme.colors.customPrimary}
          />
        ) : null}
        {handleDeleteFile ? (
          <IconButton
            icon="delete"
            size={32}
            onPress={handleDeleteFile}
            iconColor={theme.colors.customError}
          />
        ) : null}
      </ButtonsWrapper>
    </Wrapper>
  );
};
