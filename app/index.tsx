import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // check for welcome screen
  useEffect(() => {
    const checkWelcomeScreen = async () => {
      const welcomeScreenShown =
        await AsyncStorage.getItem("welcomeScreenShown");
      if (welcomeScreenShown === null) {
        router.replace("/welcome");
      } else {
        setLoading(false);
      }

      AsyncStorage.removeItem("welcomeScreenShown");
    };

    checkWelcomeScreen();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View className="flex-1 items-center justify-center bg-red-500">
      <Text>Welcome to the Expo Router!</Text>
    </View>
  );
}
