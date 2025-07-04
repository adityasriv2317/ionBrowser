import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "moti";

import BrowserProvider from "@/contexts/BrowserContext";
import BottomBar from "@/components/BottomBar";
import PageView from "@/components/PageView";

import HomeLiquid from "./(adons)/HomeLiquid";
import { TabProvider } from "@/contexts/TabContext";

export default function App() {
  const router = useRouter();

  // check if welcome screen has been shown
  useEffect(() => {
    const checkWelcomeScreen = async () => {
      const welcomeScreenShown =
        await AsyncStorage.getItem("welcomeScreenShown");
      if (welcomeScreenShown === null) {
        router.replace("/welcome");
      } else {
      }
    };
    checkWelcomeScreen();
  }, []);

  return (
    <View
      style={{ backgroundColor: "transparent", width: "100%", height: "100%" }}
    >
      <HomeLiquid />
      <TabProvider>
        <BrowserProvider>
          <SafeAreaView className="w-full h-full flex items-center justify-center">
            <PageView />
            <BottomBar />
          </SafeAreaView>
        </BrowserProvider>
      </TabProvider>
    </View>
  );
}
