import React, { FC } from "react";
import { Image, useWindowDimensions, View } from "react-native";
import {
  useTheme,
  Modal,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  uri: string;
};

export const ImageModal: FC<Props> = ({ isVisible, onClose, uri }) => {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();

  return (
    <Modal
      visible={isVisible}
      onDismiss={onClose}
      contentContainerStyle={{
        backgroundColor: theme.colors.customBackground,
        padding: 16,
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: theme.colors.customBackground,
          zIndex: 999,
          borderRadius: 100,
        }}
      >
        <IconButton icon="close" onPress={onClose} />
      </View>
      <Image
        source={{ uri }}
        resizeMode="contain"
        style={{
          width: width - 16 * 2,
          height: height * 0.6,
          zIndex: 2,
        }}
      />
      <View
        style={{
          width: width - 16 * 2,
          height: height * 0.6,
          alignItems: "center",
          justifyContent: "center",
          margin: 16,
          position: "absolute",
          zIndex: 1,
        }}
      >
        <ActivityIndicator size={64} />
      </View>
    </Modal>
  );
};
