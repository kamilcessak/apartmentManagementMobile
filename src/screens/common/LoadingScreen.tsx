import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size={64} />
    </View>
  );
};
