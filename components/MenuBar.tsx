import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  Download04Icon,
  RefreshIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Settings02Icon,
  Bookmark01Icon,
} from "@hugeicons/core-free-icons";
import { Pressable, View } from "react-native";
import { useContext } from "react";
import { BrowserContext } from "@/contexts/BrowserContext";
import { router } from "expo-router";

export default function MenuBar() {
  const {
    webRef,
    canGoBack,
    canGoForward,
    setCurrentUrl,
    setInputValue,
    setCanGoBack,
    setCanGoForward,
  } = useContext(BrowserContext);
  const menuItems = [
    {
      key: "back",
      icon: ArrowLeftIcon,
      label: "Back",
      onPress: () => {
        if (canGoBack) {
          webRef.current?.goBack();
          if (!webRef.current?.canGoBack) {
            setCanGoBack(false); // Disable back if no more history
            setInputValue(""); // Clear input if no history
            setCurrentUrl(""); // Clear current URL
          }
        }
      },
    },
    {
      key: "forward",
      icon: ArrowRightIcon,
      label: "Forward",
      onPress: () => {
        if (canGoForward) {
          webRef.current?.goForward();
        }
      },
    },
    {
      key: "refresh",
      icon: RefreshIcon,
      label: "Refresh",
      onPress: () => {
        if (webRef.current) {
          webRef.current.reload();
        }
      },
    },
    {
      key: "download",
      icon: Download04Icon,
      label: "Download",
      onPress: () => {},
    },
    {
      key: "bookmark",
      icon: Bookmark01Icon,
      label: "Bookmark",
      onPress: () => {},
    },
    {
      key: "settings",
      icon: Settings02Icon,
      label: "Settings",
      onPress: () => {
        router.push("/settings");
      },
    },
  ];

  return (
    <View className="w-full max-h-full min-h-16 flex mb-4 rounded-3xl items-center justify-center p-4">
      {/* menu items */}
      <View className="flex flex-row flex-wrap w-full rounded-full gap-4 items-center justify-center">
        {menuItems.map((item) => (
          <Pressable
            key={item.key}
            onPress={item.onPress}
            android_ripple={{ color: "#abcabc22", borderless: true }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 28, // full rounded
              marginHorizontal: 4,
              padding: 4,
              marginVertical: 4,
            }}
          >
            <HugeiconsIcon icon={item.icon} size={28} color="#fff" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
