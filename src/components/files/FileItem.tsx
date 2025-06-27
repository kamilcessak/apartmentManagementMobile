import { View } from "react-native";
import { FC } from "react";
import { Icon, IconButton, Text } from "react-native-paper";

import { useAppTheme } from "@hooks/useAppTheme";

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
  const theme = useAppTheme();

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
            onPress={() => handleDeleteFile(name)}
            iconColor={theme.colors.customError}
          />
        ) : null}
      </View>
    </View>
  );
};
