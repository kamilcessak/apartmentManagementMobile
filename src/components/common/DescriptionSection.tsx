import React, { FC, useState } from "react";
import { View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components/native";

import { FileItem } from "@components/files";
import { handleGetFile } from "@services/files";
import { ImageModal } from "@components/modals";
import { DefaultTheme } from "@typings/styledTheme";

import { DescriptionItem } from "./DescriptionItem";

const Wrapper = styled.View`
  background-color: ${({ theme }: { theme: DefaultTheme }) =>
    theme.colors.customBackground};
  padding: 16px;
  border-radius: 8px;
  gap: 8px;
`;

const ContentWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

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

  const isSectionWithFiles = data.some((e) => e?.files?.length);

  const { mutate: getFile } = useMutation({
    mutationFn: (filename: string) => handleGetFile(filename),
    onSuccess: (data) => setimgToShow(data),
  });

  const renderContent = () => {
    if (isSectionWithFiles) {
      return (
        <ContentWrapper>
          {data[0].files?.map((e, i) => (
            <FileItem
              key={`file-${e}-item-${i}`}
              name={e}
              handleShowFile={() => getFile(e)}
            />
          ))}
        </ContentWrapper>
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
      <Wrapper>
        <Text variant="titleLarge">{title}</Text>
        <Divider />
        {renderContent()}
      </Wrapper>
      <ImageModal
        isVisible={!!imgToShow.length}
        onClose={() => setimgToShow("")}
        uri={imgToShow}
      />
    </>
  );
};
