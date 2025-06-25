import React, { FC, useState } from "react";
import { View } from "react-native";
import { Divider, useTheme, Text } from "react-native-paper";
import { DescriptionItem } from "./DescriptionItem";
import { FileItem } from "@components/files";
import { useMutation } from "@tanstack/react-query";
import { handleGetFile } from "@services/files";
import { ImageModal } from "@components/modals";

type Props = {
  title: string;
  data: {
    icon?: string;
    files?: string[];
    label?: string;
    value?: string;
    color?: string;
    disableNumberOfLines?: boolean;
  }[];
};

export const DescriptionSection: FC<Props> = ({ title, data }) => {
  const [imgToShow, setimgToShow] = useState("");
  const theme = useTheme();

  const isSectionWithFiles = data.some((e) => e?.files?.length);

  const { mutate: getFile } = useMutation({
    mutationFn: (filename: string) => handleGetFile(filename),
    onSuccess: (data) => {
      setimgToShow(data);
    },
  });

  const renderContent = () => {
    if (isSectionWithFiles) {
      return (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {data[0].files?.map((e, i) => (
            <FileItem
              key={`file-${e}-item-${i}`}
              name={e}
              handleShowFile={() => getFile(e)}
            />
          ))}
        </View>
      );
    } else {
      return (
        <View style={{ gap: 8 }}>
          {data.map((e, i) => (
            <DescriptionItem key={`description-item-${title}-${i}`} {...e} />
          ))}
        </View>
      );
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: theme.colors.customBackground,
          padding: 16,
          borderRadius: 8,
          gap: 8,
        }}
      >
        <Text variant="titleLarge">{title}</Text>
        <Divider />
        {renderContent()}
      </View>
      <ImageModal
        isVisible={!!imgToShow.length}
        onClose={() => setimgToShow("")}
        uri={imgToShow}
      />
    </>
  );
};
