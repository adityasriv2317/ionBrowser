import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  Download04Icon,
  RefreshIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Settings02Icon,
  Bookmark01Icon, // using as a placeholder for bookmark/star
} from "@hugeicons/core-free-icons";
import { Pressable, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";

const menuItems = [
  {
    key: "back",
    icon: ArrowLeftIcon,
    label: "Back",
    onPress: () => {},
  },
  {
    key: "forward",
    icon: ArrowRightIcon,
    label: "Forward",
    onPress: () => {},
  },
  {
    key: "refresh",
    icon: RefreshIcon,
    label: "Refresh",
    onPress: () => {},
  },
  {
    key: "download",
    icon: Download04Icon,
    label: "Download",
    onPress: () => {},
  },
  {
    key: "bookmark",
    icon: Bookmark01Icon, // placeholder for star/bookmark
    label: "Bookmark",
    onPress: () => {},
  },
  {
    key: "settings",
    icon: Settings02Icon,
    label: "Settings",
    onPress: () => {},
  },
];

export default function MenuBar() {
  return (
    // menubar container
    // <GestureDetector gesture={}>
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
    // </GestureDetector>
  );
}

// flex-row min-h-[7%] w-full gap-2 items-center justify-between p-2
