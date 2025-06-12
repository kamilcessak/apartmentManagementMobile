import { FC } from "react";
import { TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

type Props = {
  onPress: () => void;
};

export const AddIcon: FC<Props> = ({ onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      position: "absolute",
      bottom: 16,
      right: 16,
      borderWidth: 1,
      borderRadius: 50,
      borderColor: "black",
    }}
  >
    <IconButton icon="plus" size={32} style={{ margin: 0 }} />
  </TouchableOpacity>
);
