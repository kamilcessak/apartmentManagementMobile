import Toast from "react-native-toast-message";
import { useHeaderHeight } from "@react-navigation/elements";

export const useToastNotification = () => {
  const headerHeight = useHeaderHeight();

  const showNotification = (text: string, type: "success" | "error") =>
    Toast.show({
      type: type || "success",
      text1: text,
      topOffset: headerHeight + 16,
      onPress: () => Toast.hide(),
    });

  return {
    showNotification,
  };
};
