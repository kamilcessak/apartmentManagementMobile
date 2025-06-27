import { FC } from "react";
import { Icon, Text } from "react-native-paper";
import styled from "styled-components/native";

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

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
    <Wrapper>
      {icon ? <Icon source={icon} size={24} /> : null}
      {label ? <Text variant="labelLarge">{label}</Text> : null}
      <Text
        variant="bodyLarge"
        numberOfLines={disableNumberOfLines ? undefined : 2}
        style={{ color }}
      >
        {value}
      </Text>
    </Wrapper>
  );
};
