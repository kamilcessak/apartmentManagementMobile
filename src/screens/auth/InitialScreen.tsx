import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const InitialScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Initial</Text>
      <Button
        title="Go to auth"
        onPress={() => navigation.replace("AuthenticatedStack")}
      />
    </View>
  );
};
