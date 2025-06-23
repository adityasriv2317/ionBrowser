import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StatusBar } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { SafeAreaView } from "react-native";
import { SafeAreaView } from "moti";

import BottomBar from "@/components/BottomBar";
import PageView from "@/components/PageView";

export default function App() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [accentColor, setAccentColor] = useState("#2e1065");
  const [statusBarAccent, setStatusBarAccent] = useState<
    "light-content" | "dark-content" | "default"
  >("light-content");

  function rgbaToHex(rgba: string) {
    if (rgba.startsWith("#")) {
      rgba = rgba.slice(1); // remove leading #
      return rgba;
    }

    const match = rgba.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]*)\)?$/
    );
    if (!match) return null;

    let [_, r, g, b, a] = match;
    r = parseInt(r).toString(16).padStart(2, "0");
    g = parseInt(g).toString(16).padStart(2, "0");
    b = parseInt(b).toString(16).padStart(2, "0");

    if (a === "") {
      return `${r}${g}${b}`; // no alpha
    } else {
      a = Math.round(parseFloat(a) * 255)
        .toString(16)
        .padStart(2, "0");
      return `${r}${g}${b}${a}`;
    }
  }

  function colorCompare(hex: string) {
    const cleanHex = rgbaToHex(hex) || hex;

    const hexComponents = {
      a: cleanHex.slice(0, 2),
      g: cleanHex.slice(2, 4),
      b: cleanHex.slice(4, 6),
    };

    if (
      hexComponents.g < "90" ||
      hexComponents.b < "90" ||
      hexComponents.a < "160"
    ) {
      setStatusBarAccent("light-content");
      // console.log("Setting status bar to light-content");
      // console.log(accentColor);
    } else {
      // console.log("Setting status bar to dark-content");
      setStatusBarAccent("dark-content");
      // console.log(accentColor);
    }
  }

  useEffect(() => {
    const checkAccentColor = async () => {
      colorCompare(accentColor);
      const storedColor = await AsyncStorage.getItem("accentColor");
    };

    checkAccentColor();
  }, [accentColor]);

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
      <BottomBar accentColor={statusBarAccent} />
    </SafeAreaView>
  );
}
