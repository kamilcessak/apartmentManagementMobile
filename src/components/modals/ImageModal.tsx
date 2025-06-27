import React, { FC } from "react";
import { Image, useWindowDimensions } from "react-native";
import { Modal, IconButton, ActivityIndicator } from "react-native-paper";
import styled from "styled-components/native";

import { useAppTheme } from "@hooks/useAppTheme";
import { DefaultTheme } from "@typings/styledTheme";

const IconWrapper = styled.View`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.customBackground};
  z-index: 999;
  border-radius: 100px;
`;

const LoaderWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin: 16px;
  position: absolute;
  z-index: 1;
`;

type Props = {
  isVisible: boolean;
  onClose: () => void;
  uri: string;
};

export const ImageModal: FC<Props> = ({ isVisible, onClose, uri }) => {
  const theme = useAppTheme();
  const { width, height } = useWindowDimensions();

  const windowStyle = {
    width: width - 16 * 2,
    height: height * 0.6,
  };

  return (
    <Modal
      visible={isVisible}
      onDismiss={onClose}
      contentContainerStyle={{
        backgroundColor: theme.colors.customBackground,
        padding: 16,
      }}
    >
      <IconWrapper>
        <IconButton icon="close" onPress={onClose} />
      </IconWrapper>
      <Image
        source={{ uri }}
        resizeMode="contain"
        style={{
          ...windowStyle,
          zIndex: 2,
        }}
      />
      <LoaderWrapper style={windowStyle}>
        <ActivityIndicator size={64} />
      </LoaderWrapper>
    </Modal>
  );
};
