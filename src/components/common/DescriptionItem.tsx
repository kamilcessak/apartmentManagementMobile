import { FC } from "react";
import { View } from "react-native";
import { Icon, Text } from "react-native-paper";

type Props = {
  icon?: string;
  value?: string;
  label?: string;
  color?: string;
  disableNumberOfLines?: boolean;
  files?: string[];
};

export const DescriptionItem: FC<Props> = ({
  icon,
  value,
  label,
  color,
  disableNumberOfLines,
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      {icon ? <Icon source={icon} size={24} /> : null}
      {label ? <Text variant="labelLarge">{label}</Text> : null}
      <Text
        variant="bodyLarge"
        numberOfLines={disableNumberOfLines ? undefined : 2}
        style={{ color }}
      >
        {value}
      </Text>
    </View>
  );
};
