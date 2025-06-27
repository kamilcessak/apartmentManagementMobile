import { View, Alert } from "react-native";
import { FC, useState } from "react";
import { Button, Icon, IconButton, Text, useTheme } from "react-native-paper";
import {
  requestCameraPermissionsAsync,
  launchCameraAsync,
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
} from "expo-image-picker";

import { useMutation } from "@tanstack/react-query";
import { FileType } from "@typings/files.types";
import api from "@services/api.service";
import { useToastNotification } from "@hooks/useToastNotification";

type Props = {
  name: string;
  handleShowFile?: () => void;
  handleDeleteFile?: (file: string) => void;
};

export const FileItem: FC<Props> = ({
  name,
  handleDeleteFile,
  handleShowFile,
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        width: "48%",
        marginBottom: 16,
        borderWidth: 1,
        borderColor: theme.colors.grayTertiary,
        borderRadius: 8,
        padding: 8,
        alignItems: "center",
      }}
    >
      <Icon source={"image"} size={64} />
      <Text numberOfLines={3} style={{ textAlign: "center" }}>
        {name}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
      </View>
    </View>
  );
};
