import { Alert } from "react-native";
import { FC, useState } from "react";
import { Button, Text } from "react-native-paper";
import {
  requestCameraPermissionsAsync,
  launchCameraAsync,
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
} from "expo-image-picker";
import styled from "styled-components/native";
import { useMutation } from "@tanstack/react-query";

import { FileType } from "@typings/files.types";
import api from "@services/api.service";
import { useToastNotification } from "@hooks/useToastNotification";
import { AppTheme } from "@styles/theme";

import { FileItem } from "./FileItem";

const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: ${({ theme }: { theme: AppTheme }) => theme.colors.outline};
  padding: 16px;
  border-radius: 8px;
  gap: 16px;
`;

const FilesWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 8px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

type UploadResult = {
  data: {
    success: boolean;
    url: string;
    originalName: string;
    fileName: string;
    type: string;
  };
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

  const handleAdd = () =>
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
    );

  return (
    <Wrapper>
      <SectionHeader>
        <Text>{title}</Text>
        <Button
          icon="plus"
          mode="outlined"
          style={{ borderRadius: 8 }}
          onPress={handleAdd}
        >
          {`Dodaj`}
        </Button>
      </SectionHeader>
      {files?.length ? (
        <FilesWrapper>
          {files.map((e, i) => (
            <FileItem
              key={`file-${e.fileName}-item-${i}`}
              name={e.name}
              handleDeleteFile={() => deleteFile(`${e.fileName}`)}
              handleShowFile={() => {}}
            />
          ))}
        </FilesWrapper>
      ) : null}
    </Wrapper>
  );
};
