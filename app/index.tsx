import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StatusBar } from "react-native";
import { accentColor } from "@/constants/types";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "moti";

import BottomBar from "@/components/BottomBar";
import PageView from "@/components/PageView";

import { colorCompare } from "@/constants/windowColors";
import HomeLiquid from "./(adons)/HomeLiquid";

export default function App() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // const [accentColor, setAccentColor] = useState("#2e1065");
  const [accentColor, setAccentColor] = useState("#000");
  const [statusBarAccent, setStatusBarAccent] =
    useState<accentColor>("default");

  // set status bar color based on accent color
  // useEffect(() => {
  //   const checkAccentColor = async () => {
  //     colorCompare(accentColor, setStatusBarAccent);
  //     const storedColor = await AsyncStorage.getItem("accentColor");
  //   };

  //   checkAccentColor();
  // }, [accentColor]);

  // check if welcome screen has been shown
  useEffect(() => {
    const checkWelcomeScreen = async () => {
      const welcomeScreenShown =
        await AsyncStorage.getItem("welcomeScreenShown");
      if (welcomeScreenShown === null) {
        router.replace("/Welcome");
      } else {
        setLoading(false);
      }
    };
    checkWelcomeScreen();
  }, []);

  return (
    <View
      style={{ backgroundColor: accentColor, width: "100%", height: "100%" }}
    >
      <StatusBar barStyle={statusBarAccent} />
      <HomeLiquid />
      <SafeAreaView className="w-full h-full flex m-0 items-center justify-center">
        {/* <PageView onColorChange={setAccentColor} /> */}
        <BottomBar accentColor={statusBarAccent} />
      </SafeAreaView>
    </View>
  );
}
