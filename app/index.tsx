import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StatusBar } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { SafeAreaView } from "react-native";
import { SafeAreaView } from "moti";

import BottomBar from "@/components/BottomBar";
import PageView from "@/components/PageView";

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [accentColor, setAccentColor] = useState("#2e1065");
  const [statusBarAccent, setStatusBarAccent] = useState<
    "light-content" | "dark-content" | "default"
  >("light-content");

  function hexToRGB(hex: string): RGBColor {
    const cleanHex = hex.replace("#", "").trim();
    const normalizedHex =
      cleanHex.length === 3
        ? cleanHex
            .split("")
            .map((c) => c + c)
            .join("")
        : cleanHex;

    const bigint = parseInt(normalizedHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
  }

  useEffect(() => {
    const { r, g, b } = hexToRGB(accentColor);
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    setStatusBarAccent(luminance > 186 ? "light-content" : "dark-content");
  }, [accentColor]);

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

      // AsyncStorage.removeItem("welcomeScreenShown");
    };

    checkWelcomeScreen();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: accentColor }}
      className="w-full h-full flex m-0 items-center justify-center"
    >
      <StatusBar barStyle={statusBarAccent} />
      <PageView onColorChange={setAccentColor} />
      <BottomBar />
    </SafeAreaView>
  );
}
