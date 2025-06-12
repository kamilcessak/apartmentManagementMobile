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
import { FileType } from "@types/files.types";
import api from "@services/api.service";
import { useToastNotification } from "@hooks/useToastNotification";

type UploadResult = {
  success: boolean;
  url: string;
  originalName: string;
  fileName: string;
  type: string;
};

type Props = {
  title: string;
  handleAddForm: (url: string) => void;
  handleRemoveForm: (url: string) => void;
};

export const FilesSection: FC<Props> = ({
  handleAddForm,
  handleRemoveForm,
  title,
}) => {
  const [files, setfiles] = useState<FileType[]>([]);

  const theme = useTheme();
  const { showNotification } = useToastNotification();

  const handleUploadFile = async (uri: string): Promise<UploadResult> => {
    const filename = uri.split("/").pop() || "photo.jpg";
    const match = /\.(\w+)$/.exec(filename);
    const ext = match ? match[1] : "jpg";
    const mimeType = `image/${ext === "jpg" ? "jpeg" : ext}`;

    const formData = new FormData();
    formData.append("file", {
      uri,
      name: filename,
      type: mimeType,
    } as any);

    const response = await api.post<any>(`upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  };

  const handleDeleteFile = async (fileName: string) => {
    try {
      const response = await api.delete(`upload/${fileName}`);
      console.log({ response });
      if (response.status === 200) {
        setfiles((prev) => {
          const temp = prev.filter((e) => e.fileName !== fileName);
          return temp;
        });
        handleRemoveForm(fileName);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const { mutate: uploadFile } = useMutation({
    mutationFn: handleUploadFile,
    onSuccess: ({ data: { originalName, fileName, url, type } }) => {
      showNotification("Pomyślnie dodano plik!", "success");
      handleAddForm(fileName);
      setfiles((prev) => [
        ...prev,
        { fileName, url, name: originalName, type },
      ]);
    },
    onError(error) {
      showNotification(`${error.message}`, "error");
    },
  });

  const { mutate: deleteFile } = useMutation({
    mutationFn: handleDeleteFile,
    onSuccess() {
      showNotification("Pomyślnie usunięto plik!", "success");
    },
    onError(error) {
      showNotification(`${error.message}`, "error");
    },
  });

  const requestPermission = async (
    permissionFn: () => Promise<{ status: string }>
  ) => {
    const { status } = await permissionFn();
    if (status !== "granted") {
      Alert.alert("Brak uprawnień", "Nie mogę uzyskać dostępu.");
      return false;
    }
    return true;
  };

  const handleTakePhoto = async () => {
    const permissionsGranted = await requestPermission(
      requestCameraPermissionsAsync
    );
    if (!permissionsGranted) return;

    const result = await launchCameraAsync({
      mediaTypes: "images",
      allowsEditing: false,
      quality: 0.8,
    });

    if (!result.canceled) {
      uploadFile(result.assets[0].uri);
    }
  };

  const handlePickImage = async () => {
    const permissionsGranted = await requestPermission(
      requestMediaLibraryPermissionsAsync
    );
    if (!permissionsGranted) return;

    const result = await launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      uploadFile(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: theme.colors.outline,
        padding: 16,
        borderRadius: 8,
        gap: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text>{title}</Text>
        <Button
          icon="plus"
          mode="outlined"
          style={{ borderRadius: 8 }}
          onPress={() =>
            Alert.alert(
              "Co chcesz zrobić?",
              "Chcesz przesłać istniejący plik czy zrobić zdjęcie?",
              [
                { text: "Anuluj", onPress: () => {}, style: "cancel" },
                {
                  text: "Zrób zdjęcie",
                  onPress: handleTakePhoto,
                  style: "default",
                },
                {
                  text: "Wybierz plik",
                  onPress: handlePickImage,
                  style: "default",
                },
              ]
            )
          }
        >
          Dodaj
        </Button>
      </View>
      {files?.length ? (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            padding: 8,
          }}
        >
          {files.map((e, i) => (
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
                {e.name}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconButton
                  icon="eye"
                  size={32}
                  iconColor={theme.colors.customPrimary}
                />
                <IconButton
                  icon="delete"
                  size={32}
                  onPress={() => deleteFile(`${e.fileName}`)}
                  iconColor={theme.colors.customError}
                />
              </View>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};
